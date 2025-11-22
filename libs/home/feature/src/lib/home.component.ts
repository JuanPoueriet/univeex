import { Component, OnInit, inject, CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ExcursionsService } from '../../core/services/excursions.service';
import { ExcursionCardComponent } from '../../shared/components/excursion-card/excursion-card.component';

// Para usar Swiper web components
import { register } from 'swiper/element/bundle';
register();

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslateModule, ExcursionCardComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  private excursionService = inject(ExcursionsService);
  excursions$ = this.excursionService.getFeaturedExcursions();

  ngOnInit() {
    // Lógica de inicialización
  }
}