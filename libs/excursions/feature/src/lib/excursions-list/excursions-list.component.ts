import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExcursionsService } from '../../../core/services/excursions.service';
import { ExcursionCardComponent } from '../../../shared/components/excursion-card/excursion-card.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-excursions-list',
  standalone: true,
  imports: [CommonModule, ExcursionCardComponent, TranslateModule],
  template: `
    <div class="container page-padding">
      <h1>Todas las Excursiones</h1>
      <div class="grid">
        @for (excursion of excursions$ | async; track excursion.id) {
          <app-excursion-card [excursion]="excursion"></app-excursion-card>
        }
      </div>
    </div>
  `,
  styles: [`
    .page-padding { padding-top: 2rem; padding-bottom: 4rem; }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 2rem;
      margin-top: 2rem;
    }
  `]
})
export class ExcursionsListComponent {
  private service = inject(ExcursionsService);
  excursions$ = this.service.getExcursions();
}