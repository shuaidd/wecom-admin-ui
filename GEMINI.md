# GEMINI.md - Project Overview: wecom-admin-ui

## Project Overview

This is a frontend application for a "WeCom Customer Management and Marketing System" (`wecom-admin-ui`). Based on the detailed requirements documentation, this system is a comprehensive CRM and marketing automation tool built on the WeChat Work (企业微信) API.

The application is designed to manage customer relationships, track acquisition channels, execute marketing campaigns, and analyze sales funnels. It features multiple user roles, including administrators, operations staff, and sales personnel.

**Key Technologies:**
*   **Framework:** Vue 3
*   **Build Tool:** Vite
*   **Language:** TypeScript
*   **State Management:** Pinia
*   **Routing:** Vue Router
*   **UI Library:** Ant Design Vue
*   **Testing:** Vitest
*   **Linting/Formatting:** ESLint & Prettier

**Architecture:**
The project is configured as a multi-page application (MPA) with distinct HTML entry points (`index.html`, `admin.html`, `dashboard.html`), as defined in `vite.config.ts`. This suggests different major sections of the application are loaded independently. The routing within these sections is handled by Vue Router, although the main router configuration is currently empty. The application state is managed centrally by Pinia.

## Building and Running

### Prerequisites
- Node.js (version `^20.19.0 || >=22.12.0` as per `package.json`)
- npm (or a compatible package manager)

### Installation
Install project dependencies:
```sh
npm install
```

### Development
To run the development server with hot-reloading:
```sh
npm run dev
```

### Building for Production
To type-check, compile, and minify the application for production:
```sh
npm run build
```
Different build modes can be triggered for specific environments:
```sh
# Build for development environment
npm run build:dev

# Build for production environment
npm run build:prod
```

### Testing and Linting
To run unit tests:
```sh
npm run test:unit
```

To lint the codebase and automatically fix issues:
```sh
npm run lint
```

To format the code using Prettier:
```sh
npm run format
```

## Development Conventions

*   **TypeScript:** The project is written in TypeScript. Type-checking is enforced during the build process via `vue-tsc`.
*   **Linting:** ESLint is configured with `@vue/eslint-config-typescript` to enforce code quality and consistency with Vue.js best practices.
*   **Formatting:** Prettier is used for automatic code formatting to maintain a consistent style across the codebase.
*   **Component Style:** The use of Ant Design Vue suggests that the UI should follow its design patterns and component conventions.
*   **API Integration:** The backend API specifications are extensively detailed in `docs/需求文档.md`. All API calls should adhere to the defined endpoints and data structures.
