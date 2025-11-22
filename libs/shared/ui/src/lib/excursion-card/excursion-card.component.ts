import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Excursion } from '../../../core/models/excursion.model';

@Component({
  selector: 'app-excursion-card',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule, NgOptimizedImage],
  templateUrl: './excursion-card.component.html',
  styleUrl: './excursion-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExcursionCardComponent {
  // Usando input signal como se solicitó
  excursion = input.required<Excursion>();
}
