export interface AgentInput {
  instruction: string
  screenshot?: string
  project_root: string
  niche_prompt?: 'premium-health' | 'standard' | 'correction'
}

export interface AgentOutput {
  files_changed: string[]
  summary: string
  validation_passed: boolean
  errors?: string[]
}

export interface AntigravityEvent {
  body: {
    instruction: string
    screenshot?: string
  }
  env: {
    PROJECT_ROOT: string
    ANTHROPIC_API_KEY: string
  }
}
