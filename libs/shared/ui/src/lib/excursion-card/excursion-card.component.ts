import { Component, ChangeDetectionStrategy, input, inject, signal } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Excursion } from '@univeex/shared/data-access';

@Component({
  selector: 'univeex-excursion-card',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule, NgOptimizedImage],
  templateUrl: './excursion-card.component.html',
  styleUrl: './excursion-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExcursionCardComponent {
  excursion = input.required<Excursion>();

  private translate = inject(TranslateService);
  currentLang = signal('es');

  constructor() {
      this.currentLang.set(this.translate.currentLang || 'es');
      this.translate.onLangChange.subscribe((event) => {
          this.currentLang.set(event.lang);
      });
  }
}
