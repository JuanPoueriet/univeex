import { Route } from '@angular/router';
import { MainLayoutComponent } from '@univeex/shared/ui';

export const appRoutes: Route[] = [
  {
    path: ':lang',
    component: MainLayoutComponent,
    children: [
      {
        path: 'home',
        loadComponent: () => import('@univeex/home/feature').then(m => m.HomeComponent)
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'excursions',
        loadChildren: () => import('@univeex/excursions/feature').then(m => m.EXCURSION_ROUTES)
      },
      {
        path: 'booking',
        loadChildren: () => import('@univeex/booking/feature').then(m => m.BOOKING_ROUTES)
      },
      {
        path: 'blog',
        loadChildren: () => import('@univeex/blog/feature').then(m => m.BLOG_ROUTES)
      },
      {
        path: 'contact',
        loadChildren: () => import('@univeex/contact/feature').then(m => m.CONTACT_ROUTES)
      },
      {
        path: 'about',
        loadChildren: () => import('@univeex/about/feature').then(m => m.ABOUT_ROUTES)
      },
      {
        path: 'legal',
        loadChildren: () => import('@univeex/legal/feature').then(m => m.LEGAL_ROUTES)
      },
      {
        path: 'user',
        loadChildren: () => import('@univeex/user/feature').then(m => m.USER_ROUTES)
      },
      {
        path: 'vendor',
        loadChildren: () => import('@univeex/vendor/feature').then(m => m.VENDOR_ROUTES)
      }
    ]
  },
  {
    path: '',
    redirectTo: 'es/home',
    pathMatch: 'full'
  },
  { path: '**', redirectTo: 'es/home' }
];
