import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { BreadcrumbsComponent } from '../../shared/components/breadcrumbs/breadcrumbs.component';
// import { BreadcrumbsComponent } from '../../../shared/components/breadcrumbs/breadcrumbs.component';

@Component({
  selector: 'app-legal-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, BreadcrumbsComponent],
  template: `
    <div class="container page-padding">
      <app-breadcrumbs [items]="[{label: 'Legal'}]"></app-breadcrumbs>
      <div class="legal-grid">
        <aside class="legal-sidebar">
          <h3>Información Legal</h3>
          <nav>
            <a routerLink="terms" routerLinkActive="active">Términos y Condiciones</a>
            <a routerLink="privacy" routerLinkActive="active">Política de Privacidad</a>
            <a routerLink="refunds" routerLinkActive="active">Política de Reembolsos</a>
          </nav>
        </aside>
        <main class="legal-content">
          <router-outlet></router-outlet>
        </main>
      </div>
    </div>
  `,
  styles: [`
    .legal-grid { display: grid; gap: 2rem; margin-top: 2rem; }
    @media(min-width: 768px) { .legal-grid { grid-template-columns: 250px 1fr; } }

    .legal-sidebar {
      background: #f8f9fa;
      padding: 1.5rem;
      border-radius: 12px;
      height: fit-content;

      h3 { font-size: 1.2rem; margin-bottom: 1rem; }

      a {
        display: block;
        padding: 10px;
        color: #495057;
        text-decoration: none;
        border-radius: 6px;
        margin-bottom: 5px;
        transition: all 0.2s;

        &:hover { background: #e9ecef; color: #008080; }
        &.active { background: #008080; color: white; }
      }
    }

    .legal-content { background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); }
  `]
})
export class LegalLayoutComponent {}