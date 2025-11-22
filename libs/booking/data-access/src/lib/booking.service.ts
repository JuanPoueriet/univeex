import { Injectable, signal, computed } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Excursion } from '../models/excursion.model';

export interface BookingData {
  excursionId: string;
  date: Date;
  adults: number;
  children: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  totalPrice: number;
}

// Estado para el Wizard
export interface BookingState {
  step: number;
  excursion: Excursion | any | null; // 'any' temporal si no tienes el modelo a mano en imports
  date: Date | null;
  pax: number;
  name: string;
  email: string;
  hotel: string;
}

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  // Signal de estado privado
  private state = signal<BookingState>({
    step: 1,
    excursion: null,
    date: null,
    pax: 2,
    name: '',
    email: '',
    hotel: ''
  });

  // Señal de lectura pública
  bookingSummary = this.state.asReadonly();

  // Precio calculado (simulación: precio base x pax)
  totalPrice = computed(() => {
    const s = this.state();
    const price = s.excursion ? s.excursion.price : 0;
    return price * s.pax;
  });

  // Actualizar estado
  updateBooking(changes: Partial<BookingState>) {
    this.state.update(current => ({ ...current, ...changes }));
  }

  // Finalizar reserva
  completeBooking() {
    console.log('Reserva completada:', this.state());
    // Reiniciar estado
    this.state.set({
      step: 1,
      excursion: null,
      date: null,
      pax: 2,
      name: '',
      email: '',
      hotel: ''
    });
  }

  // Método existente para compatibilidad
  createBooking(booking: BookingData): Observable<boolean> {
    console.log('Processing booking:', booking);
    return of(true);
  }
}