import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'univeex-footer',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {
    private translate = inject(TranslateService);
    currentLang = signal('es');

    constructor() {
        this.currentLang.set(this.translate.currentLang || 'es');
        this.translate.onLangChange.subscribe((event) => {
            this.currentLang.set(event.lang);
        });
    }
}
