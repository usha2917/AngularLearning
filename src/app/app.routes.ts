import { Routes } from '@angular/router';
import { Home } from './Features/home/home';

import { About } from './Features/about/about';
import { Layout } from './Shared/components/layout/layout';

export const routes: Routes = [
      {
    path: '',
     loadComponent: () =>
          import('./Features/home/home').then(m => m.Home),
    pathMatch:'full'  
  },
     {
    path: '',
    component: Layout, // ✅ Layout appears
    children: [
      {
        path: 'user',
        redirectTo: 'User',
        pathMatch: 'full'
      },

      {
        path: 'user',
        loadComponent: () =>
          import('./Features/user/user').then(m => m.User)
      },
       {
        path: 'my-candidate',
        loadComponent: () =>
          import('./Features/my-candidates/my-candidates').then(m => m.MyCandidates)
      },
       {
        path: 'about',
        loadComponent: () =>
          import('./Features/about/about').then(m => m.About)
      }
    ]
  }
];


