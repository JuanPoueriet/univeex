import { Component } from '@angular/core';

@Component({
  selector: 'app-terms',
  standalone: true,
  template: `
    <h1>Términos y Condiciones</h1>
    <div class="legal-text">
      <p>Última actualización: 2025</p>
      <h3>1. Reservas y Pagos</h3>
      <p>Todas las reservas requieren un depósito del 20% para confirmar. El saldo restante debe pagarse el día de la excursión en efectivo o tarjeta.</p>
      <h3>2. Cancelaciones</h3>
      <p>Cancelaciones con 24 horas de antelación reciben reembolso completo. Cancelaciones el mismo día no son reembolsables.</p>
      <h3>3. Responsabilidad</h3>
      <p>PuntaCanaTours actúa como intermediario. No nos hacemos responsables por pérdidas de objetos personales durante los tours.</p>
    </div>
  `,
  styles: [`h1 { color: #008080; } .legal-text { line-height: 1.8; color: #555; } h3 { margin-top: 2rem; }`]
})
export class TermsComponent {}