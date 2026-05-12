import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from 'fs'
import { execSync } from 'child_process'
import { join } from 'path'

const ALLOWED_COMMANDS = ['npx tsc', 'node -e']

export function executeToolCall(
  name: string,
  input: Record<string, string>
): string {
  switch (name) {
    case 'read_file': {
      if (!existsSync(input.path)) {
        return `ERROR: File not found: ${input.path}`
      }
      return readFileSync(input.path, 'utf-8')
    }

    case 'write_file': {
      writeFileSync(input.path, input.content, 'utf-8')
      return `File written successfully: ${input.path}`
    }

    case 'edit_file': {
      if (!existsSync(input.path)) {
        return `ERROR: File not found: ${input.path}. Use write_file to create it.`
      }
      const current = readFileSync(input.path, 'utf-8')
      if (!current.includes(input.old_string)) {
        return `ERROR: old_string not found in ${input.path}. Read the file first with read_file to get the exact current content before attempting an edit.`
      }
      const updated = current.replace(input.old_string, input.new_string)
      writeFileSync(input.path, updated, 'utf-8')
      return `Edit applied successfully to ${input.path}`
    }

    case 'list_files': {
      if (!existsSync(input.directory)) {
        return `ERROR: Directory not found: ${input.directory}`
      }
      const entries = readdirSync(input.directory).map((name) => {
        const fullPath = join(input.directory, name)
        const isDir = statSync(fullPath).isDirectory()
        return isDir ? `${fullPath}/` : fullPath
      })
      return entries.join('\n') || '(empty directory)'
    }

    case 'run_command': {
      const isAllowed = ALLOWED_COMMANDS.some((allowed) =>
        input.command.startsWith(allowed)
      )
      if (!isAllowed) {
        return `ERROR: Command not allowed. Only "npx tsc --noEmit" and "node -e" are permitted for safety.`
      }
      try {
        const output = execSync(input.command, {
          cwd: input.cwd,
          encoding: 'utf-8',
          timeout: 60_000,
        })
        return output.trim() || 'Command completed successfully (no output)'
      } catch (err: unknown) {
        const error = err as { stdout?: string; stderr?: string; message?: string }
        const out = [error.stdout, error.stderr].filter(Boolean).join('\n').trim()
        return out || error.message || 'Command failed with no output'
      }
    }

    default:
      return `ERROR: Unknown tool "${name}"`
  }
}
