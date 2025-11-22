import { Routes } from '@angular/router';
import { LegalLayoutComponent } from './legal-layout.component';
import { TermsComponent } from './pages/terms/terms.component';
import { PrivacyComponent } from './pages/privacy/privacy.component';

export const LEGAL_ROUTES: Routes = [
  {
    path: '',
    component: LegalLayoutComponent,
    children: [
      { path: 'terms', component: TermsComponent },
      { path: 'privacy', component: PrivacyComponent },
      { path: '', redirectTo: 'terms', pathMatch: 'full' }
    ]
  }
];
