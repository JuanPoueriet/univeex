import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'univeex-blog',
  standalone: true,
  imports: [TranslateModule],
  template: `
    <div class="container page-header">
      <h1>{{ 'NAV.BLOG' | translate }}</h1>
    </div>
    <div class="container">
      <p>Próximamente artículos interesantes...</p>
    </div>
  `,
  styles: [`
    @use 'variables' as vars;
    .page-header { padding: 3rem 0; text-align: center; }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogComponent {}
