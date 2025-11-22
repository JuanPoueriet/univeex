import { Component } from '@angular/core';

@Component({
  selector: 'app-privacy',
  standalone: true,
  template: `
    <h1>Política de Privacidad</h1>
    <div class="legal-text">
      <p>En PuntaCanaTours, valoramos su privacidad.</p>
      <h3>Recopilación de Datos</h3>
      <p>Solo recopilamos nombre, email y teléfono para fines de la reserva. Nunca vendemos sus datos a terceros.</p>
      <h3>Cookies</h3>
      <p>Usamos cookies esenciales para el funcionamiento del sitio y análisis anónimo.</p>
    </div>
  `,
  styles: [`h1 { color: #008080; } .legal-text { line-height: 1.8; color: #555; }`]
})
export class PrivacyComponent {}