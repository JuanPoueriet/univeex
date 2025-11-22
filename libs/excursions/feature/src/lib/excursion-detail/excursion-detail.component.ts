import { Component, inject, signal, input, effect, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ExcursionsService } from '@univeex/excursions/data-access';
import { SeoService } from '@univeex/shared/data-access';
import { LoaderComponent } from '@univeex/shared/ui';

@Component({
  selector: 'app-excursion-detail',
  standalone: true,
  imports: [CommonModule, TranslateModule, LoaderComponent, NgOptimizedImage, RouterLink],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './excursion-detail.component.html',
  styleUrls: ['./excursion-detail.component.scss']
})
export class ExcursionDetailComponent {
  private service = inject(ExcursionsService);
  private seoService = inject(SeoService);
  private router = inject(Router);

  slug = input<string>();
  excursion = signal<any>(undefined);

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

  updateSeo(data: any) {
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
    this.router.navigate(['/es/booking'], { queryParams: { excursionId: exc.id } });
  }
}
