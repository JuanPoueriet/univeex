import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Política de Privacidad</h2>
    <p>Última actualización: 01 Enero 2025</p>
    <p>Aquí va la política de privacidad...</p>
  `
})
export class PrivacyComponent {}
