import { Component, ChangeDetectionStrategy, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, ActivatedRoute, Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'univeex-main-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, TranslateModule, NavbarComponent, FooterComponent],
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayoutComponent implements OnInit {
  private translate = inject(TranslateService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  ngOnInit() {
    // Subscribe to route params to set language
    this.route.params.subscribe(params => {
      const lang = params['lang'];
      if (lang && ['es', 'en', 'fr'].includes(lang)) { // Add supported languages
        this.translate.use(lang);
      } else {
        // If lang is invalid or missing, maybe redirect or default?
        // But routing handles redirection.
        // If we are here, lang should be valid if we guard it, but for now just check.
        if (lang) this.translate.use(lang);
      }
    });
  }

  switchLang(lang: string): void {
    this.translate.use(lang);
    // Also navigate to the new URL
    // Current URL: /:lang/some/path
    // New URL: /:newLang/some/path
    const url = this.router.url;
    const parts = url.split('/');
    // parts[0] is empty, parts[1] is lang
    if (parts.length >= 2) {
        parts[1] = lang;
        this.router.navigateByUrl(parts.join('/'));
    }
  }
}
