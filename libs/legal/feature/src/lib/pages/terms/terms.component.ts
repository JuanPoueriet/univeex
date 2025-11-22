import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'univeex-terms',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Términos y Condiciones</h2>
    <p>Última actualización: 01 Enero 2025</p>
    <p>Aquí van los términos legales...</p>
  `
})
export class TermsComponent {}
