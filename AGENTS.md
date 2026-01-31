# AGENTS.md

This document provides guidelines for agentic coding assistants working in this Vue 3 + TypeScript project.

## Development Commands

```bash
# Development
npm run dev              # Start dev server with hot-reload

# Building
npm run build            # Type-check and build for production
npm run build-only       # Build without type-checking
npm run preview          # Preview production build

# Testing
npm run test:unit        # Run all unit tests with Vitest
npm run test:unit -- src/__tests__/App.spec.ts  # Run single test file
npm run test:unit -- -t "test name"  # Run tests matching pattern
npm run test:unit -- --watch  # Watch mode

# Code Quality
npm run type-check       # TypeScript type checking with vue-tsc
npm run lint             # ESLint with auto-fix
npm run format           # Format code with Prettier
```

## Code Style Guidelines

### Formatting

- **No semicolons** (Prettier config)
- **Single quotes** for strings
- **Max line length: 100 characters**
- **2-space indentation**
- **UTF-8 encoding**, **LF line endings**
- Always **insert final newline**, **trim trailing whitespace**

### TypeScript & Vue

- Use **Vue 3 Composition API** with `<script setup lang="ts">`
- Pinia stores use **Composition API style** (setup stores)
- **Path alias**: `@/` → `src/`
- Import reactivity from Vue: `import { ref, computed } from 'vue'`
- Type-check with **vue-tsc** (not regular tsc)

### Naming Conventions

- **Stores**: `useXxxStore` pattern (e.g., `useCounterStore`)
- **Components**: PascalCase (e.g., `UserList.vue`)
- **Files**: PascalCase for component files (e.g., `UserList.vue`)
- **Functions/Variables**: camelCase
- **Test files**: `*.spec.ts` in `src/__tests__/`

### Project Structure

```
src/
├── __tests__/      # Test files
├── stores/         # Pinia stores
├── router/         # Vue Router config
├── App.vue         # Root component
└── main.ts         # Entry point
```

### Linting & Type Checking

- **ESLint** for Vue + TypeScript with `eslint-plugin-vue`
- **Prettier** for formatting (integrated via eslint-config-prettier)
- **vue-tsc** for TypeScript type checking
- Always run `npm run lint` and `npm run type-check` before committing

### Testing Patterns

- Use **Vitest** with jsdom environment
- Use **@vue/test-utils** for component testing
- Test files in `src/**/__tests__/*.spec.ts`
- Import from vitest: `import { describe, it, expect } from 'vitest'`

### Import Style

- Keep imports organized and grouped
- Third-party imports first, then local imports
- Use path alias for local imports: `@/stores/counter`

### Node Version

- Requires Node.js ^20.19.0 || >=22.12.0

### Component Library

- **MUST use ant-design-vue 4.2.6+** - This version requirement is mandatory for all UI components

### Component Naming Rules

- **Component files MUST use PascalCase** (e.g., `UserList.vue`, `LoginPage.vue`, `Error404.vue`)
- **NEVER use kebab-case for component files** (e.g., do not use `user-list.vue`)
- This rule is mandatory for all new Vue component files created in the project

## Quality Checks Required

After making changes, ALWAYS run:

1. `npm run lint` - Fix all linting errors
2. `npm run type-check` - Ensure no TypeScript errors
3. `npm run test:unit` - Verify tests pass
