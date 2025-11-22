import { Component, CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'univeex-testimonials',
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestimonialsComponent {
  testimonials = [
    { name: 'Carlos M.', text: '¡Increíble experiencia en Saona!', avatar: 'assets/images/avatar1.jpg' },
    { name: 'Sarah J.', text: 'Los buggies fueron pura adrenalina.', avatar: 'assets/images/avatar2.jpg' },
    { name: 'Familia Ruiz', text: 'Muy buena atención y puntualidad.', avatar: 'assets/images/avatar3.jpg' }
  ];
}
