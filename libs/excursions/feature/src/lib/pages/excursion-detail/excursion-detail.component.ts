import { Component, Input, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExcursionsService } from '@univeex/excursions/data-access';
import { RouterLink } from '@angular/router'; // Ahora sí se usará
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'univeex-excursion-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslateModule],
  templateUrl: './excursion-detail.component.html',
  styleUrl: './excursion-detail.component.scss'
})
export class ExcursionDetailComponent {
  private service = inject(ExcursionsService);
  excursion = signal<any>(null);

  @Input()
  set slug(value: string) {
    this.service.getExcursionBySlug(value).subscribe(data => this.excursion.set(data));
  }
}
