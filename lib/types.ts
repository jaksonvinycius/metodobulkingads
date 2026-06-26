// Central contract for all client landing page configurations.
// Used by templates, generator, store, and the studio dashboard.

export interface StatItem {
  title: string
  subtitle: string
}

export interface ProblemItem {
  title: string
  description: string
}

export interface SolutionItem {
  title: string
  description: string
}

export interface StepItem {
  title: string
  description: string
}

export interface QualificationQuestion {
  label: string
  options: string[]
}

export interface ClientConfig {
  // ── Identity ──────────────────────────────────────────────────────────────
  id: string                        // URL-safe slug: "dra-ana-lima"
  template: 'premium-health' | 'standard'
  niche?: string                    // For standard: "jurídico", "educação", etc.

  // ── Person / Brand ────────────────────────────────────────────────────────
  name: string                      // "Dra. Ana Lima"
  profession: string                // "Nutricionista Clínica"
  method_name?: string              // "Método NutriCode" (optional)
  location?: string                 // "São Paulo, SP"

  // ── Contact ───────────────────────────────────────────────────────────────
  whatsapp: string                  // digits only: "5511999999999"
  instagram?: string                // handle without @: "ana.lima.nutri"
  tiktok?: string                   // handle without @: "ananutri"

  // ── Media ─────────────────────────────────────────────────────────────────
  photo_filename?: string           // "photo.webp" — placed in project /public/
  favicon_initials: string          // "AL" — auto-derived from name

  // ── Brand ─────────────────────────────────────────────────────────────────
  colors: {
    primary: string                 // HSL values: "30 50% 50%"
    background?: string             // HSL values: "20 10% 7%"
  }

  // ── SEO ───────────────────────────────────────────────────────────────────
  seo: {
    title: string                   // "Dra. Ana Lima | Nutrição que Transforma"
    description: string
    keywords: string[]
    domain?: string                 // "drananutri.com.br"
  }

  // ── Hero Section ──────────────────────────────────────────────────────────
  hero: {
    badge: string                   // "Nutricionista Especialista"
    headline: string                // Full headline text
    headline_highlight: string      // Substring of headline that gets gradient
    subheadline: string
    cta_primary: string             // "Agendar consulta gratuita"
    stats: StatItem[]               // 3 stat cards
  }

  // ── Content Sections ──────────────────────────────────────────────────────
  problems: ProblemItem[]           // 4–5 pain points
  solutions: SolutionItem[]         // 3–4 differentiators
  steps: StepItem[]                 // 3–4 process steps

  // ── Qualification Modal ───────────────────────────────────────────────────
  qualification: {
    questions: QualificationQuestion[]  // 3–4 questions
    disqualifier_answer: string         // Exact answer text that disqualifies
    google_sheets_webhook?: string      // Client-specific webhook URL
  }

  // ── CTA Texts ─────────────────────────────────────────────────────────────
  cta: {
    final_title: string             // "Pronto para dar o próximo passo?"
    final_subtitle: string
    diagnostic_title: string        // "Responda X perguntas e receba..."
    diagnostic_subtitle: string
    whatsapp_message: string        // Pre-filled WA message template
  }
}

// ── Project record stored in studio/data/projects.json ────────────────────
export type ProjectStatus = 'draft' | 'generating' | 'ready' | 'deployed' | 'error'

export interface ProjectRecord {
  id: string
  client_name: string
  template: ClientConfig['template']
  niche?: string
  status: ProjectStatus
  status_message?: string           // Human-readable progress or error detail
  created_at: string                // ISO 8601
  updated_at: string
  deployed_url?: string
  vercel_project_id?: string
  project_path: string              // Absolute path: /projects/{id}/
  config: ClientConfig
}

// ── Generator input/output ────────────────────────────────────────────────
export interface GeneratorInput {
  config: ClientConfig
  photo_temp_path?: string          // Temp upload path, copied to project /public/
}

export interface GeneratorOutput {
  project_path: string
  validation_passed: boolean
  errors?: string[]
}

// ── Deployer input/output ─────────────────────────────────────────────────
export interface DeployerInput {
  project_path: string
  project_name: string              // Vercel project slug
  env_vars?: Record<string, string>
  domain?: string
}

export interface DeployerOutput {
  url: string
  deployment_id: string
  vercel_project_id: string
}
