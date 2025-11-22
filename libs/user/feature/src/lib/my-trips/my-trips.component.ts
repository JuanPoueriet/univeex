import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'univeex-my-trips',
  standalone: true,
  imports: [CommonModule, RouterLink, NgOptimizedImage],
  templateUrl: './my-trips.component.html',
  styleUrl: './my-trips.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyTripsComponent {}
