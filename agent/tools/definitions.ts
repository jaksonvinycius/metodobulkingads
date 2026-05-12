import type Anthropic from '@anthropic-ai/sdk'

export const toolDefinitions: Anthropic.Tool[] = [
  {
    name: 'read_file',
    description:
      'Reads the content of a source file in the Next.js project. Always read a file before modifying it to understand the current state.',
    input_schema: {
      type: 'object' as const,
      properties: {
        path: {
          type: 'string',
          description: 'Absolute path to the file',
        },
      },
      required: ['path'],
    },
  },
  {
    name: 'write_file',
    description:
      'Creates or completely overwrites a file with new content. Use for new files or large rewrites. Always read the file first if it already exists.',
    input_schema: {
      type: 'object' as const,
      properties: {
        path: {
          type: 'string',
          description: 'Absolute path to the file',
        },
        content: {
          type: 'string',
          description: 'Complete file content to write',
        },
      },
      required: ['path', 'content'],
    },
  },
  {
    name: 'edit_file',
    description:
      'Makes a surgical string replacement in a file. Safer than write_file for small targeted changes. The old_string must match exactly (including all whitespace and indentation) what is currently in the file. Read the file first to get the exact current content.',
    input_schema: {
      type: 'object' as const,
      properties: {
        path: {
          type: 'string',
          description: 'Absolute path to the file',
        },
        old_string: {
          type: 'string',
          description: 'Exact string to find in the file (must match character-for-character)',
        },
        new_string: {
          type: 'string',
          description: 'String to replace it with',
        },
      },
      required: ['path', 'old_string', 'new_string'],
    },
  },
  {
    name: 'list_files',
    description:
      'Lists all files in a directory (one level deep, non-recursive). Use to explore the project structure.',
    input_schema: {
      type: 'object' as const,
      properties: {
        directory: {
          type: 'string',
          description: 'Absolute path to directory',
        },
      },
      required: ['directory'],
    },
  },
  {
    name: 'run_command',
    description:
      'Runs a shell command in the project directory. ONLY allowed commands: "npx tsc --noEmit" (TypeScript type check) and "node -e <expression>" (quick JS evaluation). Do NOT run npm install, git commands, or any destructive operations.',
    input_schema: {
      type: 'object' as const,
      properties: {
        command: {
          type: 'string',
          description: 'The command to run (only tsc and node -e are allowed)',
        },
        cwd: {
          type: 'string',
          description: 'Working directory (project root path)',
        },
      },
      required: ['command', 'cwd'],
    },
  },
]
