# PracAngular - Production-Grade Angular Application

A modern, enterprise-ready Angular 20 application with industry-standard architecture, lazy loading, environment configuration, and comprehensive error handling.

## 🚀 Quick Start

### Prerequisites
- **Node.js**: 18.x or higher
- **npm**: 9.x or higher
- **Angular CLI**: 20.3.7+

### Installation & Running

```bash
# Navigate to project directory
cd PracAngular

# Install dependencies
npm install

# Start development server
npm start

# Open browser to http://localhost:4200/
```

## 📚 Documentation

### Architecture & Configuration
Comprehensive documentation on application bootstrap, routing, and architecture:
👉 **See [ARCHITECTURE.md](./ARCHITECTURE.md)** for detailed information

### Key Topics in ARCHITECTURE.md
- Application Bootstrap Process
- Routing Configuration & Lazy Loading
- Core Services & Interceptors
- Environment Configuration
- Adding New Features
- Deployment Guide

## 🏗️ Project Structure

```
src/app/
├── Core/                 # Global services, interceptors, configuration
├── Features/             # Feature modules (lazy-loaded)
├── Models/               # TypeScript interfaces and data models
├── Service/              # API services for data management
├── Shared/               # Reusable components and utilities
├── app.config.ts         # Application provider configuration
├── app.routes.ts         # Route definitions with lazy loading
└── app.ts                # Root component
```

## ✨ Key Features

- ✅ **Standalone Components**: Modern Angular without NgModules
- ✅ **Lazy Loading**: Route-based code splitting for performance
- ✅ **Signals API**: Reactive state management
- ✅ **HTTP Interceptors**: Global error handling and logging
- ✅ **Environment Configuration**: Development, staging, and production configs
- ✅ **TypeScript Strict Mode**: Type-safe development
- ✅ **Production-Ready**: Enterprise-grade architecture

## 🛠️ Available Commands

```bash
# Development
npm start              # Run dev server (http://localhost:4200)
npm run build         # Build for production
npm test              # Run unit tests
npm run watch         # Build in watch mode

# Building
npm run build         # Optimized production build
ng build --stats-json # Build with bundle analysis
```

## 🏭 Production Build

Generate optimized build:

```bash
npm run build

# Output in: dist/prac-angular/
```

**Build includes:**
- Minified code
- Tree-shaking (unused code removal)
- AOT compilation
- Output hashing for cache busting

## 🌍 Environment Configuration

Three environment configurations available:

| Environment | File | API Base URL | Logging | Error Tracking |
|------------|------|-------------|---------|----------------|
| **Dev** | `environments/environment.ts` | jsonplaceholder | Console | Disabled |
| **Staging** | `environments/environment.staging.ts` | staging-api | Console + Remote | Enabled |
| **Prod** | `environments/environment.prod.ts` | api | Remote only | Enabled |

**Switch environments:**
```bash
ng serve --configuration development
ng serve --configuration production
ng build --configuration production
```

## 🔌 Core Services

### Logger Service
Centralized logging with environment awareness:
```typescript
this.logger.debug('Message', data);
this.logger.info('Message');
this.logger.warn('Message');
this.logger.error('Message', error);
```

### HTTP Interceptors
- **ErrorInterceptor**: Catches and logs HTTP errors
- **LoggingInterceptor**: Logs all requests with performance metrics

### API Configuration
Environment-specific API endpoints via `API_CONFIG` token

## 🔄 Routing

**Lazy-Loaded Routes:**
- `/` → Home component
- `/home` → Home component
- `/user/user` → User component
- `/user/my-candidate` → My Candidates component
- `/user/about` → About component

All routes use lazy loading for optimal performance.

## 🚦 Application Bootstrap

1. Browser loads `index.html`
2. Angular bootstraps from `main.ts`
3. Loads `app.config.ts` with providers:
   - Router configuration
   - HTTP client with interceptors
   - API configuration
   - Logging services
4. Renders root `App` component
5. Routes load on demand

## 📦 Technology Stack

- **Framework**: Angular 20.3.0
- **Language**: TypeScript 5.x
- **Styling**: TailwindCSS 4.1.18 + Custom SCSS
- **Components**: Angular Material 20.2.14
- **HTTP**: RxJS 7.8.0
- **Build**: Angular CLI 20.3.7 + esbuild

## 🐛 Troubleshooting

### Port 4200 already in use?

**Windows (PowerShell):**
```powershell
# Find and kill process on port 4200
Get-NetTCPConnection -LocalPort 4200 -ErrorAction SilentlyContinue |
  Select-Object -ExpandProperty OwningProcess |
  ForEach-Object { Stop-Process -Id $_ -Force -ErrorAction SilentlyContinue }
```

### Dependencies installation issues?

```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules and lock file
rm -r node_modules package-lock.json

# Reinstall
npm install
```

## 📖 Learning Resources

- [Angular Documentation](https://angular.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [RxJS Operators](https://rxjs.dev)
- [Angular Material](https://material.angular.io)

## ✅ Verification Checklist

- [ ] `npm install` completes successfully
- [ ] `npm start` starts dev server without errors
- [ ] Application loads in browser at http://localhost:4200
- [ ] Navigation menus work
- [ ] API calls succeed (check Network tab in DevTools)
- [ ] No console errors
- [ ] Logging shows in console
- [ ] Routes load correctly
- [ ] `npm run build` completes successfully

## 📝 Next Steps

1. **Read ARCHITECTURE.md** for detailed developer guide
2. **Explore Features** in `src/app/Features/`
3. **Review Services** in `src/app/Service/`
4. **Add New Features** by following patterns in existing code
5. **Configure API** endpoints in environment files

## 🤝 Contributing

See [ARCHITECTURE.md - Contributing Section](./ARCHITECTURE.md#contributing) for code style guidelines and commit conventions.

---

**Version**: 1.0.0  
**Angular**: 20.3.0  
**Last Updated**: February 2026  

For detailed information about application architecture and routing configuration, see [ARCHITECTURE.md](./ARCHITECTURE.md)
