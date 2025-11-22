import { Component, OnInit, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { BookingService, BookingData } from '@univeex/booking/data-access';
import { ExcursionsService } from '@univeex/excursions/data-access';
import { Excursion } from '@univeex/shared/data-access';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BookingWizardComponent } from './booking-wizard/booking-wizard.component';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule, BookingWizardComponent],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookingComponent implements OnInit {
  private fb = inject(FormBuilder);
  private bookingService = inject(BookingService);
  private excursionService = inject(ExcursionsService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  currentStep = signal(1);
  bookingForm: FormGroup;

  // Data
  excursions$ = this.excursionService.getExcursions();
  selectedExcursion = signal<Excursion | undefined>(undefined);
  totalPrice = signal<number>(0);

  constructor() {
    this.bookingForm = this.fb.group({
      excursionId: ['', Validators.required],
      date: ['', Validators.required],
      adults: [2, [Validators.required, Validators.min(1)]],
      children: [0, [Validators.min(0)]],
      customerName: ['', Validators.required],
      customerEmail: ['', [Validators.required, Validators.email]],
      customerPhone: ['', Validators.required]
    });

    // Reaccionar a cambios en el formulario para actualizar precio y excursión seleccionada
    this.bookingForm.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe(val => {
        this.updateCalculations(val);
      });
  }

  ngOnInit() {
    // Pre-seleccionar excursión si viene por query params
    this.route.queryParams.subscribe(params => {
      if (params['excursionId']) {
        this.bookingForm.patchValue({ excursionId: params['excursionId'] });
        // También actualizamos el estado del wizard service para compatibilidad
        this.excursionService.getExcursionById(params['excursionId']).subscribe(exc => {
            if(exc) {
                this.bookingService.updateBooking({ excursion: exc });
            }
        });
      }
    });
  }

  updateCalculations(formValue: any) {
    const excId = formValue.excursionId;

    // Buscar excursión si cambió
    if (excId && this.selectedExcursion()?.id !== excId) {
      this.excursionService.getExcursionById(excId).subscribe(exc => {
        this.selectedExcursion.set(exc);
        this.calculateTotal(formValue, exc);

        // Sincronizar con el service del wizard
        if(exc) this.bookingService.updateBooking({ excursion: exc });
      });
    } else {
      // Si ya tenemos la excursión, solo recalcular total
      this.calculateTotal(formValue, this.selectedExcursion());
    }
  }

  calculateTotal(val: any, excursion?: Excursion) {
    if (!excursion) {
      this.totalPrice.set(0);
      return;
    }
    const adults = Number(val.adults) || 0;
    const children = Number(val.children) || 0;
    const price = excursion.price;
    const childPrice = price * 0.5; // Asumimos 50% para niños por ahora

    this.totalPrice.set((adults * price) + (children * childPrice));
  }

  nextStep() {
    if (this.isStepValid()) {
      this.currentStep.update(s => s + 1);
    } else {
      this.bookingForm.markAllAsTouched();
    }
  }

  prevStep() {
    this.currentStep.update(s => Math.max(1, s - 1));
  }

  isStepValid(): boolean {
    const step = this.currentStep();
    if (step === 1) {
      return !!(
        this.bookingForm.get('excursionId')?.valid &&
        this.bookingForm.get('date')?.valid &&
        this.bookingForm.get('adults')?.valid
      );
    }
    if (step === 2) {
      return !!(
        this.bookingForm.get('customerName')?.valid &&
        this.bookingForm.get('customerEmail')?.valid &&
        this.bookingForm.get('customerPhone')?.valid
      );
    }
    return true;
  }

  getExcursionName(): string {
    return this.selectedExcursion()?.title || 'Seleccione una excursión';
  }

  submitBooking() {
    if (this.bookingForm.valid) {
      const bookingData: BookingData = {
        ...this.bookingForm.value,
        totalPrice: this.totalPrice()
      };

      this.bookingService.createBooking(bookingData).subscribe(success => {
        if (success) {
          alert('¡Reserva confirmada! (Modo Demo)');
          this.router.navigate(['/']);
        }
      });
    }
  }
}
