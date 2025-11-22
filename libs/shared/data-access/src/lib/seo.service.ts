import { Injectable, inject, Renderer2, RendererFactory2, Inject, PLATFORM_ID } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class SeoService {
  private title = inject(Title);
  private meta = inject(Meta);
  private renderer: Renderer2;

  constructor(
    rendererFactory: RendererFactory2,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  updateTags(config: { title: string; description: string; image?: string; slug?: string }) {
    this.title.setTitle(`${config.title} | PuntaCanaTrips`);
    this.meta.updateTag({ name: 'description', content: config.description });
    this.meta.updateTag({ property: 'og:title', content: config.title });
    this.meta.updateTag({ property: 'og:description', content: config.description });
    this.meta.updateTag({ property: 'og:image', content: config.image || 'assets/images/default.jpg' });
    this.meta.updateTag({ property: 'og:url', content: `https://puntacanatrips.com/${config.slug || ''}` });
  }

  setJsonLd(data: any) {
    if (isPlatformBrowser(this.platformId)) {
      let script = this.document.querySelector('script[type="application/ld+json"]');
      if (script) {
        script.textContent = JSON.stringify(data);
      } else {
        script = this.renderer.createElement('script');
        this.renderer.setAttribute(script, 'type', 'application/ld+json');
        this.renderer.setProperty(script, 'textContent', JSON.stringify(data));
        this.renderer.appendChild(this.document.head, script);
      }
    }
  }
}