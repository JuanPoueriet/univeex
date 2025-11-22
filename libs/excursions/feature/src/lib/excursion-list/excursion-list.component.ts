import { Component, OnInit, inject, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ExcursionsService } from '@univeex/excursions/data-access';
import { Excursion } from '@univeex/shared/data-access';
import { ExcursionCardComponent, BreadcrumbsComponent, SkeletonLoaderComponent } from '@univeex/shared/ui';

@Component({
  selector: 'univeex-excursion-list',
  standalone: true,
  imports: [CommonModule, TranslateModule, FormsModule, ExcursionCardComponent, BreadcrumbsComponent, SkeletonLoaderComponent],
  templateUrl: './excursion-list.component.html',
  styleUrls: ['./excursion-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExcursionListComponent implements OnInit {
  private excursionService = inject(ExcursionsService);

  // Estado
  excursions = signal<Excursion[]>([]);
  isLoading = signal(true);

  // Filtros
  filterCategory = signal('all');
  filterPriceMax = signal(200);
  filterDuration = signal('all'); // 'short' (<4h), 'medium' (4-7h), 'long' (>7h)

  // Computed: Lógica de filtrado
  filteredExcursions = computed(() => {
    const list = this.excursions();
    const cat = this.filterCategory();
    const maxPrice = this.filterPriceMax();
    const dur = this.filterDuration();

    return list.filter(e => {
      // 1. Categoría
      const matchCat = cat === 'all' || e.category === cat;

      // 2. Precio
      const matchPrice = e.price <= maxPrice;

      // 3. Duración (Parseo simple de strings "4 Horas" -> 4)
      let matchDur = true;
      const hours = parseInt(e.duration);
      if (dur === 'short') matchDur = hours < 4;
      else if (dur === 'medium') matchDur = hours >= 4 && hours <= 7;
      else if (dur === 'long') matchDur = hours > 7;

      return matchCat && matchPrice && matchDur;
    });
  });

  ngOnInit() {
    this.excursionService.getExcursions().subscribe(data => {
      this.excursions.set(data);
      this.isLoading.set(false);
    });
  }
}
