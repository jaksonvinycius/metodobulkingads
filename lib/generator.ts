import fs from 'fs/promises'
import path from 'path'
import { execSync } from 'child_process'
import type { ClientConfig, GeneratorInput, GeneratorOutput } from './types'

const TEMPLATES_DIR = path.join(process.cwd(), 'templates')
const PROJECTS_DIR = path.join(process.cwd(), 'projects')

// Compute HSL variant strings from a base HSL string like "30 50% 50%"
function computeColorVariants(hsl: string): {
  primary: string
  light: string
  lighter: string
  dark: string
} {
  const match = hsl.match(/^(\d+)\s+([\d.]+)%\s+([\d.]+)%$/)
  if (!match) return { primary: hsl, light: hsl, lighter: hsl, dark: hsl }
  const h = match[1]
  const s = parseFloat(match[2])
  const l = parseFloat(match[3])
  return {
    primary: `${h} ${s}% ${l}%`,
    light:   `${h} ${s}% ${Math.min(l + 15, 95)}%`,
    lighter: `${h} ${s}% ${Math.min(l + 25, 95)}%`,
    dark:    `${h} ${s}% ${Math.max(l - 12, 5)}%`,
  }
}

function replacePlaceholders(content: string, config: ClientConfig): string {
  const primary = config.colors.primary
  const background = config.colors.background ?? '20 10% 7%'
  const colors = computeColorVariants(primary)

  const replacements: Record<string, string> = {
    '{{PRIMARY_HSL}}':        colors.primary,
    '{{PRIMARY_LIGHT}}':      colors.light,
    '{{PRIMARY_LIGHTER}}':    colors.lighter,
    '{{PRIMARY_DARK}}':       colors.dark,
    '{{BACKGROUND_HSL}}':     background,
    '{{CLIENT_ID}}':          config.id,
    '{{CLIENT_NAME}}':        config.name,
    '{{CLIENT_PROFESSION}}':  config.profession,
    '{{CLIENT_WHATSAPP}}':    config.whatsapp,
    '{{FAVICON_INITIALS}}':   config.favicon_initials,
    '{{SEO_TITLE}}':          config.seo.title,
    '{{SEO_DESCRIPTION}}':    config.seo.description,
    '{{SEO_DOMAIN}}':         config.seo.domain ?? '',
  }

  let result = content
  for (const [key, val] of Object.entries(replacements)) {
    result = result.replaceAll(key, val)
  }
  return result
}

async function copyDir(src: string, dest: string): Promise<void> {
  await fs.mkdir(dest, { recursive: true })
  const entries = await fs.readdir(src, { withFileTypes: true })
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name)
    const destPath = path.join(dest, entry.name)
    if (entry.isDirectory()) {
      await copyDir(srcPath, destPath)
    } else {
      await fs.copyFile(srcPath, destPath)
    }
  }
}

async function writeClientConfig(projectPath: string, config: ClientConfig): Promise<void> {
  const configContent = `import type { ClientConfig } from '@/lib/types'

const clientConfig: ClientConfig = ${JSON.stringify(config, null, 2)}

export default clientConfig
`
  await fs.writeFile(path.join(projectPath, 'client.config.ts'), configContent, 'utf-8')
}

async function patchGlobalsCss(projectPath: string, config: ClientConfig): Promise<void> {
  const cssPath = path.join(projectPath, 'app', 'globals.css')
  const content = await fs.readFile(cssPath, 'utf-8')
  const patched = replacePlaceholders(content, config)
  await fs.writeFile(cssPath, patched, 'utf-8')
}

async function generateFavicon(projectPath: string, initials: string, primaryHsl: string): Promise<void> {
  const scriptPath = path.join(process.cwd(), 'scripts', 'generate-favicon.mjs')
  try {
    execSync(
      `node "${scriptPath}" "${initials}" "${primaryHsl}"`,
      { cwd: projectPath, stdio: 'pipe' }
    )
  } catch {
    // favicon generation is non-critical; continue
  }
}

async function copyPhoto(
  tempPath: string,
  projectPath: string,
  filename: string
): Promise<void> {
  const destDir = path.join(projectPath, 'public')
  await fs.mkdir(destDir, { recursive: true })
  await fs.copyFile(tempPath, path.join(destDir, filename))
}

function runNpmInstall(projectPath: string): void {
  execSync('npm install --prefer-offline', {
    cwd: projectPath,
    stdio: 'pipe',
    timeout: 120_000,
  })
}

function runBuildCheck(projectPath: string): string[] {
  try {
    execSync('npx tsc --noEmit', { cwd: projectPath, stdio: 'pipe' })
    return []
  } catch (e: unknown) {
    const err = e as { stdout?: Buffer; stderr?: Buffer }
    const output = (err.stdout?.toString() ?? '') + (err.stderr?.toString() ?? '')
    return output.split('\n').filter(Boolean)
  }
}

export async function generateProject(input: GeneratorInput): Promise<GeneratorOutput> {
  const { config, photo_temp_path } = input
  const templateDir = path.join(TEMPLATES_DIR, config.template)
  const projectPath = path.join(PROJECTS_DIR, config.id)

  // 1. Clone template
  await copyDir(templateDir, projectPath)

  // 2. Write typed client.config.ts (replaces the placeholder file)
  await writeClientConfig(projectPath, config)

  // 3. Patch globals.css with actual color values
  await patchGlobalsCss(projectPath, config)

  // 4. Copy photo if provided
  if (photo_temp_path && config.photo_filename) {
    await copyPhoto(photo_temp_path, projectPath, config.photo_filename)
  }

  // 5. Generate favicon
  await generateFavicon(projectPath, config.favicon_initials, config.colors.primary)

  // 6. npm install
  runNpmInstall(projectPath)

  // 7. TypeScript validation
  const errors = runBuildCheck(projectPath)

  return {
    project_path: projectPath,
    validation_passed: errors.length === 0,
    errors: errors.length > 0 ? errors : undefined,
  }
}
