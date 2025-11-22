import { Component, OnInit, inject, CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ExcursionsService } from '@univeex/excursions/data-access';
import { ExcursionCardComponent } from '@univeex/shared/ui';

// Para usar Swiper web components
import { register } from 'swiper/element/bundle';
register();

@Component({
  selector: 'univeex-home',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslateModule, ExcursionCardComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  private excursionService = inject(ExcursionsService);
  private translate = inject(TranslateService);

  excursions$ = this.excursionService.getFeaturedExcursions();
  currentLang = signal('es');

  constructor() {
      this.currentLang.set(this.translate.currentLang || 'es');
      this.translate.onLangChange.subscribe((event) => {
          this.currentLang.set(event.lang);
      });
  }

  ngOnInit() {
    // Lógica de inicialización
  }
}
