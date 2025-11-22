import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { BookingService } from '@univeex/booking/data-access';
import { TranslateModule } from '@ngx-translate/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-booking-wizard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule, RouterLink],
  templateUrl: './booking-wizard.component.html',
  styleUrl: './booking-wizard.component.scss'
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
