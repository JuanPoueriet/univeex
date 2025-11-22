import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { BookingService } from '../../../core/services/booking.service';
import { TranslateModule } from '@ngx-translate/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-booking-wizard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule, RouterLink],
  template: `
    <div class="container wizard-container">
      @if (bookingService.bookingSummary().excursion; as exc) {
        <h2>Reservando: {{ exc.title }}</h2>

        <div class="steps-indicator">
          <div [class.active]="step() === 1">1. Fecha</div>
          <div [class.active]="step() === 2">2. Datos</div>
          <div [class.active]="step() === 3">3. Pago</div>
        </div>

        <form [formGroup]="form" class="booking-form">
          @if (step() === 1) {
            <div class="step-content">
              <label>Selecciona Fecha</label>
              <input type="date" formControlName="date" class="form-control">

              <label>Número de Personas</label>
              <input type="number" formControlName="pax" min="1" class="form-control">
            </div>
          }

          @if (step() === 2) {
            <div class="step-content">
              <label>Nombre Completo</label>
              <input type="text" formControlName="name" class="form-control">
              <label>Email</label>
              <input type="email" formControlName="email" class="form-control">
              <label>Hotel / Alojamiento</label>
              <input type="text" formControlName="hotel" class="form-control">
            </div>
          }

          @if (step() === 3) {
            <div class="summary">
              <p><strong>Fecha:</strong> {{ form.get('date')?.value }}</p>
              <p><strong>Pax:</strong> {{ form.get('pax')?.value }}</p>
              <div class="total">
                Total a Pagar: \${{ bookingService.totalPrice() }}
              </div>
            </div>
          }

          <div class="actions">
            @if (step() > 1) {
              <button (click)="prevStep()" type="button" class="btn-secondary">
                {{ 'BOOKING.PREV' | translate }}
              </button>
            }

            @if (step() < 3) {
              <button (click)="nextStep()" type="button" class="btn-tropical">
                {{ 'BOOKING.NEXT' | translate }}
              </button>
            }

            @if (step() === 3) {
              <button (click)="confirm()" type="button" class="btn-tropical">
                {{ 'BOOKING.CONFIRM' | translate }}
              </button>
            }
          </div>
        </form>
      } @else {
        <p>No has seleccionado ninguna excursión.</p>
        <a routerLink="/excursiones" class="btn-tropical">Ver Excursiones</a>
      }
    </div>
  `,
  styles: [`
    .wizard-container { padding: 3rem 1rem; max-width: 600px; margin: 0 auto; }
    .steps-indicator { display: flex; justify-content: space-between; margin-bottom: 2rem; border-bottom: 1px solid #eee; }
    .steps-indicator div { padding: 10px; color: #ccc; &.active { color: #008080; font-weight: bold; border-bottom: 2px solid #008080; } }
    .form-control { width: 100%; padding: 10px; margin-bottom: 15px; border: 1px solid #ddd; border-radius: 8px; }
    .actions { display: flex; gap: 1rem; margin-top: 2rem; }
    .btn-secondary { background: white; border: 1px solid #ccc; padding: 10px 20px; border-radius: 50px; cursor: pointer; }
    .total { font-size: 1.5rem; color: #008080; font-weight: bold; margin-top: 1rem; }
  `]
})
export class BookingWizardComponent {
  bookingService = inject(BookingService);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  // CORRECCIÓN: Usamos 'computed' para extraer solo el número del paso.
  // Antes esto devolvía todo el objeto 'BookingState', causando el error de tipos.
  step = computed(() => this.bookingService.bookingSummary().step);

  form = this.fb.group({
    date: ['', Validators.required],
    pax: [2, [Validators.required, Validators.min(1)]],
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    hotel: ['']
  });

  nextStep() {
    const currentStep = this.step(); // Ahora esto es un número correcto

    const rawDate = this.form.get('date')?.value;
    const date = rawDate ? new Date(rawDate) : null;
    const pax = Number(this.form.get('pax')?.value) || 0;

    this.bookingService.updateBooking({
      step: currentStep + 1,
      date: date,
      pax: pax
    });
  }

  prevStep() {
    const currentStep = this.step();
    this.bookingService.updateBooking({ step: currentStep - 1 });
  }

  confirm() {
    this.bookingService.completeBooking();
    alert('¡Reserva realizada! (Simulación)');
    this.router.navigate(['/']);
  }
}