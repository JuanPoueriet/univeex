import { Component, ChangeDetectionStrategy, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { filter } from 'rxjs';
import { AuthService } from '@univeex/shared/data-access';

@Component({
  selector: 'univeex-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '(window:scroll)': 'onWindowScroll()' }
})
export class NavbarComponent {
  private translate = inject(TranslateService);
  private router = inject(Router);
  // Inyectamos Auth
  public auth = inject(AuthService);

  scrolled = signal(false);
  menuOpen = signal(false);
  currentLang = signal('es');
  showUserMenu = signal(false);

  constructor() {
    // Sync signal with service
    this.currentLang.set(this.translate.currentLang || 'es');

    this.translate.onLangChange.subscribe((event) => {
        this.currentLang.set(event.lang);
    });

    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(() => {
        this.menuOpen.set(false);
        this.showUserMenu.set(false);
    });
  }

  toggleMenu() { this.menuOpen.update(v => !v); }
  toggleUserMenu() { this.showUserMenu.update(v => !v); }

  switchLang(lang: string) {
    // MainLayout handles the actual switching and routing if we use the method there,
    // but here we need to trigger it.
    // Ideally, we should just navigate to the new URL.
    const url = this.router.url;
    const parts = url.split('/'); // ['', 'es', 'home']
    if (parts.length >= 2) {
        parts[1] = lang;
        this.router.navigateByUrl(parts.join('/'));
    } else {
        this.router.navigate(['/', lang]);
    }
  }

  onWindowScroll() { this.scrolled.set(window.scrollY > 50); }

  // Actions de Auth mockeados
  loginUser() { this.auth.loginAsUser(); }
  loginVendor() {
      this.auth.loginAsVendor();
      this.router.navigate(['/', this.currentLang(), 'vendor', 'dashboard']);
  }
  logout() {
      this.auth.logout();
      this.router.navigate(['/', this.currentLang()]);
  }
}
