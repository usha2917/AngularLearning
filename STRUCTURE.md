## Project Structure & Naming Conventions

This guide explains the folder structure and naming conventions used in PracAngular to maintain consistency and scalability.

---

## 📁 Folder Organization

```
PracAngular/
│
├── src/
│   ├── app/                           # Angular application
│   │
│   ├── Core/                          # Global services & configuration
│   │   ├── config/                   # Configuration tokens
│   │   │   └── api.config.ts        # API configuration
│   │   ├── interceptors/             # HTTP interceptors
│   │   │   ├── error.interceptor.ts # Global error handling
│   │   │   └── logging.interceptor.ts # Request/response logging
│   │   └── services/                 # Core services
│   │       └── logger.service.ts    # Logging service
│   │
│   ├── Features/                      # Feature modules (lazy-loaded)
│   │   ├── home/                     # Landing page
│   │   ├── user/                     # User management
│   │   ├── my-candidates/            # Candidates list
│   │   └── about/                    # About page
│   │
│   ├── Models/                        # Data models & interfaces
│   │   └── user-model.ts            # User data structure
│   │
│   ├── Service/                       # API services
│   │   └── user-service.ts          # User API integration
│   │
│   ├── Shared/                        # Reusable components
│   │   └── components/
│   │       └── layout/               # Main layout/shell
│   │           ├── layout.ts        # Component logic
│   │           ├── layout.html      # Template
│   │           └── layout.css       # Styles
│   │
│   ├── Assets/                        # Static assets
│   │   └── Image/
│   │
│   ├── environments/                  # Environment configs
│   │   ├── environment.ts            # Development
│   │   ├── environment.prod.ts       # Production
│   │   └── environment.staging.ts    # Staging
│   │
│   ├── app.config.ts                 # App configuration
│   ├── app.routes.ts                 # Routing configuration
│   ├── app.ts                        # Root component
│   ├── main.ts                       # Entry point
│   └── styles.css                    # Global styles
│
├── public/                            # Public assets (served as-is)
│
├── angular.json                       # Angular CLI configuration
├── tsconfig.json                      # TypeScript configuration
├── package.json                       # npm dependencies
├── README.md                          # Project overview
├── ARCHITECTURE.md                    # Architecture guide
├── README-PRODUCTION.md               # Production guide
└── IMPROVEMENTS.md                    # Changes summary
```

---

## 🏷️ Naming Conventions

### Files & Components

#### PascalCase (Classes, Components)
```typescript
// Components
export class Home { }
export class UserList { }
export class UserCard { }

// Services
export class UserService { }
export class AuthenticationService { }
export class DataService { }

// Models/Interfaces
export interface UserModel { }
export class UserDTO { }
```

#### camelCase (Variables, Functions)
```typescript
// Variables
private userName: string;
protected isLoggedIn: boolean;

// Functions/Methods
getUserById(id: number) { }
formatDate(date: Date) { }
```

#### kebab-case (File Names)
```
user-service.ts          // Services
user-model.ts            // Models
error.interceptor.ts     // Interceptors
logger.service.ts        // Services
api.config.ts            // Configuration
```

#### kebab-case (Folders)
```
my-candidates/           # Feature folders
my-feature/              # Feature folders
shared-components/       # Shared folders
```

---

## 📋 File Structure Pattern

### Component File
```
feature-name.ts (component logic)
feature-name.html (template)
feature-name.css (styles)
feature-name.spec.ts (tests)
```

### Service File
```
service-name.service.ts (service logic)
service-name.service.spec.ts (unit tests)
```

---

## 📂 Folder Purposes

### Core/
**Purpose**: Global functionality used across the application

**Contains:**
- HTTP interceptors (error, logging, authentication)
- Global services (logger, storage)
- Configuration tokens (API_CONFIG)
- Global guards (route guards)

**Guidelines:**
- Only services of global scope
- Shared by all features
- Platform-level functionality
- Injected as singletons

---

### Features/
**Purpose**: Feature modules (lazy-loaded for performance)

**Structure per feature:**
```
feature-name/
├── feature-name.ts       # Component
├── feature-name.html     # Template
├── feature-name.css      # Styles
├── feature-name.spec.ts  # Tests
└── (sub-components)      # Child components
```

**Guidelines:**
- Each feature is independent
- Lazy-loaded via routes
- Self-contained components
- Can have own services (feature-specific)

---

### Models/
**Purpose**: TypeScript interfaces and data structures

**File naming:**
```
user-model.ts            # User data structure
candidate-model.ts       # Candidate structure
request.model.ts         # API request DTOs
response.model.ts        # API response DTOs
```

**Guidelines:**
- Only interfaces and types
- Represents data structures
- Shared across services
- No logic/methods

---

### Service/
**Purpose**: Business logic and API integration

**File naming:**
```
user-service.ts          # User API calls
candidate-service.ts     # Candidate management
data-service.ts          # General data operations
```

**Guidelines:**
- One service per resource
- Handle API communication
- Data transformation
- Error handling
- Logging via LoggerService

---

### Shared/
**Purpose**: Reusable components and utilities

**Structure:**
```
Shared/
├── components/          # Reusable components
│   └── layout/         # Layout wrapper
├── utils/              # Utility functions
├── pipes/              # Custom pipes
└── directives/         # Custom directives
```

**Guidelines:**
- Reusable across features
- No feature-specific logic
- Generic presentation
- Highly configurable

---

### Environments/
**Purpose**: Environment-specific configuration

**File naming:**
```
environment.ts           # Development
environment.prod.ts      # Production
environment.staging.ts   # Staging
```

**Guidelines:**
- One file per environment
- Same interface structure
- API endpoints
- Feature flags
- Logging levels

---

## 🔄 How to Add a New Feature

### 1. Create Feature Folder
```bash
mkdir src/app/Features/product-list
```

### 2. Create Feature Component
```typescript
// product-list.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-product-list',
  standalone: true,
  templateUrl: './product-list.html',
  styleUrl: './product-list.css'
})
export class ProductList { }
```

### 3. Create Template
```html
<!-- product-list.html -->
<div class="product-list">
  <!-- Template content -->
</div>
```

### 4. Create Styles
```css
/* product-list.css */
.product-list {
  /* Styles */
}
```

### 5. Create Service (if needed)
```typescript
// ../Service/product.service.ts
@Injectable({ providedIn: 'root' })
export class ProductService {
  constructor(
    private http: HttpClient,
    @Inject(API_CONFIG) private apiConfig: ApiConfig,
    private logger: LoggerService
  ) {}
  
  getProducts(): Observable<ProductModel[]> {
    // Implementation
  }
}
```

### 6. Add Route
```typescript
// app.routes.ts
{
  path: 'products',
  loadComponent: () =>
    import('./Features/product-list/product-list')
      .then(m => m.ProductList)
}
```

---

## 📐 Service Structure Pattern

```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserModel } from '../Models/user-model';
import { API_CONFIG, ApiConfig } from '../Core/config/api.config';
import { LoggerService } from '../Core/services/logger.service';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly usersEndpoint = '/users';

  constructor(
    private http: HttpClient,
    @Inject(API_CONFIG) private apiConfig: ApiConfig,
    private logger: LoggerService
  ) {}

  getUsers(): Observable<UserModel[]> {
    const url = `${this.apiConfig.baseUrl}${this.usersEndpoint}`;
    this.logger.debug('Fetching users', { url });
    
    return this.http.get<UserModel[]>(url).pipe(
      catchError((error) => {
        this.logger.error('Failed to fetch users', error);
        throw error;
      })
    );
  }
}
```

---

## 🎯 Component Structure Pattern

```typescript
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UserService } from '../../Service/user-service';
import { LoggerService } from '../../Core/services/logger.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css'
})
export class UserList implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  constructor(
    private userService: UserService,
    private logger: LoggerService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadUsers(): void {
    this.userService.getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (users) => {
          this.logger.debug('Users loaded', { count: users.length });
        },
        error: (error) => {
          this.logger.error('Failed to load users', error);
        }
      });
  }
}
```

---

## ✅ Best Practices

1. **Module Organization**
   - One feature per folder
   - Clear separation of concerns
   - Shared code in Shared/ or Core/

2. **Naming**
   - PascalCase for classes
   - camelCase for variables/functions
   - kebab-case for files/folders

3. **Services**
   - One service per resource
   - Use dependency injection
   - Handle errors consistently
   - Log important operations

4. **Components**
   - Keep them small and focused
   - Use services for logic
   - Implement OnDestroy for cleanup
   - Use trackBy for lists

5. **Imports**
   - Use absolute paths from root
   - Keep imports organized
   - Import only needed items

---

## 📚 Related Documentation

- **ARCHITECTURE.md** - Detailed architecture overview
- **README-PRODUCTION.md** - Production deployment guide
- **IMPROVEMENTS.md** - Summary of changes

---

**Last Updated**: February 2026  
**Version**: 1.0.0
