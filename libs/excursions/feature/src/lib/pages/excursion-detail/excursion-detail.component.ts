import { Component, Input, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExcursionsService } from '../../../../core/services/excursions.service';
import { RouterLink } from '@angular/router'; // Ahora sí se usará
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-excursion-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslateModule],
  template: `
    <div class="container mt-4">
      <a routerLink="/excursiones" class="back-link">← Volver a Excursiones</a>
    </div>

    @if (excursion(); as exc) {
      <div class="detail-header">
        <img [src]="exc.imageUrl" class="main-img" [alt]="exc.title">
      </div>

      <div class="container content-layout">
        <div class="main-info">
          <h1>{{ exc.title }}</h1>
          <p class="desc">{{ exc.description }}</p>

          <h3>{{ 'DETAIL.HIGHLIGHTS' | translate }}</h3>
          <ul>
            @for (item of exc.highlights; track item) {
              <li>✅ {{ item }}</li>
            }
          </ul>
        </div>

        <aside class="booking-sidebar">
          <div class="card-booking">
            <div class="price-tag">\${{ exc.price }} <small>per person</small></div>
            <div class="form-placeholder">
              <label>Fecha</label>
              <input type="date" class="form-control">
              <label>Personas</label>
              <input type="number" min="1" value="2" class="form-control">
              <button class="btn-tropical w-full">
                {{ 'DETAIL.BOOK_NOW' | translate }}
              </button>
            </div>
          </div>
        </aside>
      </div>
    }
  `,
  styles: [`
    .mt-4 { margin-top: 1.5rem; margin-bottom: 1rem; }
    .back-link { color: #2C3E50; text-decoration: none; font-weight: 600; &:hover { text-decoration: underline; } }
    .content-layout { display: grid; grid-template-columns: 2fr 1fr; gap: 3rem; margin-top: 2rem; position: relative; z-index: 2; }
    .main-img { width: 100%; height: 50vh; object-fit: cover; border-radius: 16px; }
    .card-booking {
      background: white;
      padding: 2rem;
      border-radius: 16px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.1);
      position: sticky;
      top: 100px;
    }
    .w-full { width: 100%; margin-top: 1rem; }

    @media (max-width: 768px) {
      .content-layout { grid-template-columns: 1fr; }
    }
  `]
})
export class ExcursionDetailComponent {
  private service = inject(ExcursionsService);
  excursion = signal<any>(null);

  @Input()
  set slug(value: string) {
    this.service.getExcursionBySlug(value).subscribe(data => this.excursion.set(data));
  }
}