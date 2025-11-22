import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExcursionsService } from '@univeex/excursions/data-access';
import { ExcursionCardComponent } from '@univeex/shared/ui';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'univeex-excursions-list',
  standalone: true,
  imports: [CommonModule, ExcursionCardComponent, TranslateModule],
  templateUrl: './excursions-list.component.html',
  styleUrl: './excursions-list.component.scss'
})
export class ExcursionsListComponent {
  private service = inject(ExcursionsService);
  excursions$ = this.service.getExcursions();
}
