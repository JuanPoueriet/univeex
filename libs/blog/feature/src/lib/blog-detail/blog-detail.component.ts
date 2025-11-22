import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="container page-padding">
      <a routerLink="/blog" class="back-link">← Volver</a>
      <h1>Articulo: {{ slug }}</h1>
      <p>Contenido completo del artículo aquí...</p>
    </div>
  `,
  styles: [`
    .page-padding { padding-top: 4rem; padding-bottom: 4rem; }
    .back-link { display: block; margin-bottom: 1rem; color: #008080; }
  `]
})
export class BlogDetailComponent {
  @Input() slug?: string;
}