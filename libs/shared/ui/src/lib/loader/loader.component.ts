import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'univeex-loader',
  standalone: true,
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoaderComponent {}
