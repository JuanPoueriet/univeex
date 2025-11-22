import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-my-trips',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="container page-padding">
      <h1>Mis Viajes</h1>

      <div class="tabs">
        <button class="active">Próximos</button>
        <button>Pasados</button>
      </div>

      <div class="trips-grid">
        <div class="trip-card">
          <img src="https://images.unsplash.com/photo-1511739001486-91d91467b1c8?q=80&w=1000" alt="Paris">
          <div class="info">
            <span class="status confirmed">Confirmado</span>
            <h3>Torre Eiffel: Acceso Directo</h3>
            <p class="date"><i class="far fa-calendar"></i> 15 Nov 2025 • 10:00 AM</p>
            <p class="location"><i class="fas fa-map-marker-alt"></i> París, Francia</p>
            <div class="actions">
              <button class="btn-outline">Ver Ticket</button>
              <button class="btn-text">Cancelar</button>
            </div>
          </div>
        </div>

        <div class="empty-state" *ngIf="false">
            <i class="fas fa-suitcase-rolling"></i>
            <p>No tienes viajes planeados aún.</p>
            <a routerLink="/excursions" class="btn-tropical">Explorar Destinos</a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page-padding { padding-top: 4rem; padding-bottom: 4rem; min-height: 70vh; }
    .tabs { margin-bottom: 2rem; border-bottom: 1px solid #eee; display: flex; gap: 2rem; }
    .tabs button { background: none; border: none; padding-bottom: 10px; font-weight: 600; color: #777; cursor: pointer;
      &.active { color: #008080; border-bottom: 2px solid #008080; } }

    .trip-card {
      display: flex; background: white; border: 1px solid #eee; border-radius: 12px; overflow: hidden; margin-bottom: 1.5rem;
      img { width: 200px; object-fit: cover; }
      .info { padding: 1.5rem; flex: 1; }
      .status { font-size: 0.75rem; font-weight: bold; text-transform: uppercase; color: #16a34a; background: #dcfce7; padding: 4px 8px; border-radius: 4px; }
      h3 { margin: 10px 0; }
      .date, .location { color: #555; margin-bottom: 5px; font-size: 0.9rem; i { width: 20px; text-align: center; } }
      .actions { margin-top: 1rem; display: flex; gap: 1rem; }
      .btn-outline { border: 1px solid #ddd; background: white; padding: 8px 16px; border-radius: 20px; cursor: pointer; font-weight: 600; &:hover { border-color: #333; } }
      .btn-text { background: none; border: none; text-decoration: underline; cursor: pointer; color: #777; }

      @media (max-width: 768px) { flex-direction: column; img { width: 100%; height: 150px; } }
    }
  `]
})
export class MyTripsComponent {}