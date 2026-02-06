# PracAngular - Production-Grade Angular Application

## 📋 Table of Contents

- [Overview](#overview)
- [Project Structure](#project-structure)
- [Application Bootstrap](#application-bootstrap)
- [Routing Configuration](#routing-configuration)
- [Core Architecture](#core-architecture)
- [Development Guide](#development-guide)
- [Building & Deployment](#building--deployment)
- [Contributing](#contributing)

---

## Overview

PracAngular is a modern Angular 20 application built with the latest Angular features including:

- **Standalone Components**: Built with Angular standalone components (no NgModule required)
- **Lazy Loading**: Route-based code splitting for optimal performance
- **Signals API**: Modern state management using Angular Signals
- **Environment Configuration**: Multiple environment support (development, staging, production)
- **HTTP Interceptors**: Global error handling and request/response logging
- **Production-Ready**: Enterprise-grade architecture with proper separation of concerns

**Technology Stack:**
- Angular 20.3.0
- TypeScript 5.x
- TailwindCSS 4.1.18
- Angular Material 20.2.14
- RxJS 7.8.0

---

## Project Structure

```
src/
├── app/
│   ├── Core/                          # Core functionality
│   │   ├── config/
│   │   │   └── api.config.ts         # API configuration token & factory
│   │   ├── interceptors/
│   │   │   ├── error.interceptor.ts   # Global HTTP error handling
│   │   │   └── logging.interceptor.ts # HTTP request/response logging
│   │   └── services/
│   │       └── logger.service.ts      # Centralized logging service
│   │
│   ├── Features/                      # Feature modules (lazy-loaded)
│   │   ├── home/                      # Home feature
│   │   │   ├── home.ts               # Component logic
│   │   │   ├── home.html             # Component template
│   │   │   ├── home.css              # Component styles
│   │   │   └── home.spec.ts          # Unit tests
│   │   ├── user/                      # User feature
│   │   ├── my-candidates/             # My Candidates feature
│   │   └── about/                     # About feature
│   │
│   ├── Models/                        # Data models & interfaces
│   │   └── user-model.ts             # User data model
│   │
│   ├── Service/                       # Application services
│   │   └── user-service.ts           # User API service
│   │
│   ├── Shared/                        # Shared components & utilities
│   │   └── components/
│   │       └── layout/                # Main layout component
│   │           ├── layout.ts
│   │           ├── layout.html
│   │           └── layout.css
│   │
│   ├── app.config.ts                 # App providers configuration
│   ├── app.routes.ts                 # Route definitions
│   ├── app.ts                        # Root component
│   └── app.html                      # Root template
│
├── environments/                      # Environment configurations
│   ├── environment.ts                # Development
│   ├── environment.prod.ts           # Production
│   └── environment.staging.ts        # Staging
│
├── Assets/                           # Static assets
├── main.ts                           # Application entry point
├── index.html                        # HTML template
└── styles.css                        # Global styles

```

### Folder Naming Conventions

- **Core/**: Global services, interceptors, and configurations
- **Features/**: Feature-specific components (lazy-loaded)
- **Models/**: TypeScript interfaces and data models
- **Service/**: API services and data management
- **Shared/**: Reusable components and utilities
- **environments/**: Environment-specific configurations

---

## Application Bootstrap

### Entry Point: `main.ts`

The application starts from `src/main.ts`:

```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
```

### Bootstrap Flow

1. **index.html**: Browser loads the HTML file
   - Contains `<app-root></app-root>` placeholder
   - Loads global styles and Material Design resources

2. **main.ts**: Angular bootstrap starts
   - Calls `bootstrapApplication()` with root component (`App`)
   - Passes application configuration via `appConfig`

3. **app.config.ts**: Application Configuration
   ```typescript
   export const appConfig: ApplicationConfig = {
     providers: [
       // Zone change detection optimization
       provideZoneChangeDetection({ eventCoalescing: true }),
       
       // Router with lazy-loaded routes
       provideRouter(routes),
       
       // HTTP Client with interceptors
       provideHttpClient(),
       HTTP_INTERCEPTORS for error handling & logging,
       
       // API Configuration
       API_CONFIG factory
     ]
   };
   ```

4. **App Component** (`src/app/app.ts`):
   - Root component with `<router-outlet>`
   - Renders the application shell

### Key Providers in App Config

| Provider | Purpose |
|----------|---------|
| `provideZoneChangeDetection` | Optimizes change detection with event coalescing |
| `provideRouter(routes)` | Configures routing system |
| `provideHttpClient()` | Enables HTTP client |
| `ErrorInterceptor` | Catches and logs HTTP errors globally |
| `LoggingInterceptor` | Logs all HTTP requests/responses |
| `API_CONFIG` | Provides environment-specific API base URL |

---

## Routing Configuration

### Route Configuration: `app.routes.ts`

```typescript
export const routes: Routes = [
  // Home route - default/landing page
  {
    path: '',
    loadComponent: () =>
      import('./Features/home/home').then(m => m.Home),
    pathMatch: 'full'
  },
  
  // Home alternate path
  {
    path: 'home',
    loadComponent: () =>
      import('./Features/home/home').then(m => m.Home)
  },
  
  // User section with layout wrapper and child routes
  {
    path: 'user',
    component: Layout,
    children: [
      {
        path: 'user',
        loadComponent: () =>
          import('./Features/user/user').then(m => m.User)
      },
      {
        path: 'my-candidate',
        loadComponent: () =>
          import('./Features/my-candidates/my-candidates')
            .then(m => m.MyCandidates)
      },
      {
        path: 'about',
        loadComponent: () =>
          import('./Features/about/about').then(m => m.About)
      }
    ]
  }
];
```

### Routing Strategy

- **Lazy Loading**: Feature components are lazy-loaded only when needed
  - Reduces initial bundle size
  - Improves application startup performance
  
- **Nested Routes**: `/user` path groups related routes
  - `Layout` component provides wrapper/navigation
  - Child routes render within `<router-outlet>` in Layout
  
- **Path Matching**: `pathMatch: 'full'` ensures exact matching for home route

### Navigation Examples

```typescript
// In components:
constructor(private router: Router) {}

// Navigate programmatically
this.router.navigate(['/user/my-candidate']);

// Navigate with parameters
this.router.navigate(['/user', userId]);

// Create URL without navigation
const url = this.router.serializeUrl(
  this.router.createUrlTree(['/user/my-candidate'])
);
window.open(url, '_blank');
```

### Route URLs

| Path | Component | Lazy Load |
|------|-----------|-----------|
| `/` or `/home` | Home | ✓ Yes |
| `/user/user` | User | ✓ Yes |
| `/user/my-candidate` | MyCandidates | ✓ Yes |
| `/user/about` | About | ✓ Yes |

---

## Core Architecture

### 1. Core Services Layer

#### Logger Service (`Core/services/logger.service.ts`)

Centralized logging with environment-aware configuration:

```typescript
// Usage in services/components
constructor(private logger: LoggerService) {}

this.logger.debug('User loaded', userData);
this.logger.info('Operation completed');
this.logger.warn('Deprecated method used');
this.logger.error('Operation failed', error);
```

**Features:**
- Environment-specific log levels
- Console logging for development
- Remote logging support for production
- Structured logging with timestamps

#### HTTP Interceptors

**ErrorInterceptor** (`Core/interceptors/error.interceptor.ts`):
- Catches all HTTP errors globally
- Logs errors with detailed information
- Prevents unhandled promise rejections

**LoggingInterceptor** (`Core/interceptors/logging.interceptor.ts`):
- Logs all HTTP requests and responses
- Measures request duration
- Helps with debugging and monitoring

### 2. Environment Configuration

**Development** (`environments/environment.ts`):
```typescript
{
  production: false,
  apiBaseUrl: 'https://jsonplaceholder.typicode.com',
  logging: { enableConsole: true, level: 'debug' },
  features: { enableErrorTracking: false }
}
```

**Production** (`environments/environment.prod.ts`):
```typescript
{
  production: true,
  apiBaseUrl: 'https://api.yourcompany.com',
  logging: { enableConsole: false, enableRemote: true },
  features: { enableErrorTracking: true, enableAnalytics: true }
}
```

**Staging** (`environments/environment.staging.ts`):
- Mixed configuration between dev and prod

### 3. API Configuration

**API_CONFIG Token** (`Core/config/api.config.ts`):

```typescript
// Provides environment-specific configuration
@Inject(API_CONFIG) private apiConfig: ApiConfig
```

Benefits:
- Single source of truth for API endpoints
- Environment-specific base URLs
- Easy to change without code changes
- Supports multiple API servers

### 4. Services Layer

**UserService** (`Service/user-service.ts`):

```typescript
constructor(
  private http: HttpClient,
  @Inject(API_CONFIG) private apiConfig: ApiConfig,
  private logger: LoggerService
) {}

getUsers(): Observable<UserModel[]> {
  // Uses injected API config
  // Logs with Logger service
  // Errors handled by ErrorInterceptor
}
```

---

## Development Guide

### Prerequisites

- Node.js 18+ and npm
- Angular CLI 20.3.7+
- VS Code (recommended)

### Installation

```bash
# Navigate to project directory
cd PracAngular

# Install dependencies
npm install
```

### Development Server

```bash
# Start development server
npm start

# Server runs on http://localhost:4200/
# Application auto-reloads on code changes
```

### Build for Production

```bash
# Build for production
npm run build

# Output: dist/prac-angular/

# Build with size analysis
ng build --stats-json
```

### Testing

```bash
# Run unit tests
npm test

# Run tests with code coverage
ng test --code-coverage
```

### Code Quality

**Linting** (Configure ESLint):
```bash
npm run lint
```

**Formatting** (Prettier configured in package.json):
```bash
npm run format
```

---

## Building & Deployment

### Build Configurations

**Development Build:**
```bash
npm start
```
- No optimizations
- Source maps enabled
- Fast rebuild on changes

**Production Build:**
```bash
npm run build
```
- Minified bundles
- Tree-shaking enabled
- AOT compilation
- Output hashing for caching

### Build Budgets

Configured in `angular.json`:
- **Initial Bundle**: Max 1MB (warning: 500kB)
- **Component Styles**: Max 8kB (warning: 4kB)

Monitor with:
```bash
ng build --stats-json
```

### Deployment Steps

1. **Build Application:**
   ```bash
   npm run build
   ```

2. **Verify Build Output:**
   ```bash
   ls -la dist/prac-angular/
   ```

3. **Deploy to Server:**
   - Copy contents of `dist/prac-angular/` to web server
   - Configure server to serve `index.html` for all routes (SPA requirement)

4. **Verify Deployment:**
   - Test routing: Navigate to different URLs
   - Check console for errors
   - Verify API calls to correct endpoints

### Production Checklist

- [ ] Environment set to production
- [ ] API endpoints configured correctly
- [ ] Error tracking enabled (Sentry/LogRocket)
- [ ] Analytics configured
- [ ] Security headers configured on server
- [ ] CORS properly configured
- [ ] Performance monitoring enabled
- [ ] Logging setup for production
- [ ] CDN configured (if applicable)
- [ ] SSL/HTTPS enabled

---

## Adding New Features

### 1. Create Feature Module

```bash
# Create feature directory
mkdir src/app/Features/new-feature

# Create feature component
# new-feature.ts, new-feature.html, new-feature.css
```

### 2. Add Feature Route

```typescript
// app.routes.ts
{
  path: 'new-feature',
  loadComponent: () =>
    import('./Features/new-feature/new-feature')
      .then(m => m.NewFeature)
}
```

### 3. Update Navigation

```typescript
// layout.html or navigation component
<a routerLink="/new-feature">New Feature</a>
```

### 4. Create Service (if needed)

```typescript
// Service/new-feature.service.ts
@Injectable({ providedIn: 'root' })
export class NewFeatureService {
  // Use @Inject(API_CONFIG) and LoggerService
}
```

---

## Troubleshooting

### Port Already in Use

```powershell
# Find and kill process on port 4200
Get-NetTCPConnection -LocalPort 4200 -ErrorAction SilentlyContinue |
  Select-Object -ExpandProperty OwningProcess |
  ForEach-Object { Stop-Process -Id $_ -Force -ErrorAction SilentlyContinue }
```

### Module Not Found Errors

- Check imports use correct paths
- Verify component is exported from its file
- Ensure lazy-loaded components are exported as `export class ComponentName`

### Routes Not Working

- Verify routes defined in `app.routes.ts`
- Check `<router-outlet>` is present in parent template
- Ensure `pathMatch: 'full'` for exact matches
- Use `routerLink` directive for navigation

### HTTP Errors Not Caught

- Verify `ErrorInterceptor` added to `app.config.ts`
- Check service uses injected `HttpClient`
- Ensure proper error handling in components

---

## Performance Optimization

1. **Lazy Loading**: All feature routes are lazy-loaded
2. **Change Detection**: Optimized with `eventCoalescing: true`
3. **Bundle Analysis**: Use `ng build --stats-json`
4. **Production Build**: Minification, tree-shaking, AOT enabled
5. **Image Optimization**: Use modern formats and lazy loading
6. **HTTP Caching**: Configure cache headers on server

---

## Contributing

### Code Style

- Follow Angular style guide
- Use TypeScript strict mode
- Write meaningful variable/function names
- Add JSDoc comments for public APIs

### Committing Changes

```bash
git add .
git commit -m "feat: add new feature description"
```

**Commit Types:**
- `feat`: New feature
- `fix`: Bug fix
- `refactor`: Code restructuring
- `docs`: Documentation
- `test`: Tests
- `chore`: Build, dependencies

---

## Resources

- [Angular Documentation](https://angular.dev)
- [Angular CLI](https://angular.io/cli)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [RxJS](https://rxjs.dev)
- [Material Design](https://material.angular.io)

---

## Support

For issues, questions, or suggestions:
1. Check existing documentation
2. Review application logs
3. Check browser console for errors
4. Verify environment configuration

---

**Last Updated:** February 2026  
**Angular Version:** 20.3.0  
**Node Version:** 18+
