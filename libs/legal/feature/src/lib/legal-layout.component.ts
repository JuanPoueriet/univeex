import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'univeex-legal-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="container page-padding">
      <div class="legal-grid">
        <aside>
          <nav>
            <a routerLink="terms" routerLinkActive="active">Términos</a>
            <a routerLink="privacy" routerLinkActive="active">Privacidad</a>
          </nav>
        </aside>
        <main>
          <router-outlet></router-outlet>
        </main>
      </div>
    </div>
  `,
  styles: [`
    .page-padding { padding-top: 4rem; padding-bottom: 4rem; }
    .legal-grid { display: grid; grid-template-columns: 200px 1fr; gap: 2rem; }
    nav a { display: block; padding: 10px; color: #555; text-decoration: none; &.active { font-weight: bold; color: #008080; } }
  `]
})
export class LegalLayoutComponent {}
