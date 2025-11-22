import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslateModule],
  template: `
    <div class="container page-padding">
      <h1>{{ 'BLOG.TITLE' | translate }}</h1>
      <div class="grid">
        <div class="blog-card">
          <h3>5 Playas Secretas en Punta Cana</h3>
          <p>Descubre los tesoros escondidos lejos de los resorts...</p>
          <a [routerLink]="['/blog', 'playas-secretas']" class="btn-tropical">
            {{ 'BLOG.READ_MORE' | translate }}
          </a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page-padding { padding-top: 4rem; padding-bottom: 4rem; }
    .grid { margin-top: 2rem; }
    .blog-card { background: white; padding: 2rem; border-radius: 16px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); }
  `]
})
export class BlogListComponent {}