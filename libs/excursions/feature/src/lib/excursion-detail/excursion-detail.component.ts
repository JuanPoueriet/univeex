import { Component, inject, signal, input, effect, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule, NgOptimizedImage, DatePipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ExcursionsService } from '@univeex/excursions/data-access';
import { Excursion, SeoService } from '@univeex/shared/data-access';
import { LoaderComponent } from '@univeex/shared/ui';

@Component({
  selector: 'app-excursion-detail',
  standalone: true,
  imports: [CommonModule, TranslateModule, LoaderComponent, NgOptimizedImage, RouterLink, DatePipe],
  templateUrl: './excursion-detail.component.html',
  styleUrls: ['./excursion-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExcursionDetailComponent {
  private service = inject(ExcursionsService);
  private seoService = inject(SeoService);
  private router = inject(Router);

  slug = input<string>();
  excursion = signal<Excursion | undefined>(undefined);

  constructor() {
    effect(() => {
      const s = this.slug();
      if (s) {
        this.service.getExcursionBySlug(s).subscribe(data => {
          this.excursion.set(data);
          if (data) this.updateSeo(data);
        });
      }
    });
  }

  updateSeo(data: Excursion) {
    this.seoService.updateTags({
      title: data.title,
      description: data.shortDescription,
      image: data.imageUrl,
      slug: `excursions/${data.slug}`
    });
  }

  bookNow() {
    const exc = this.excursion();
    if (!exc) return;
    // Lógica de redirección simple al booking con query params
    this.router.navigate(['/es/booking'], { queryParams: { excursionId: exc.id } });
  }
}
