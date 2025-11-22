import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { ExcursionsService } from '../../../core/services/excursions.service';
// import { AuthService } from '../../../core/services/auth.service';
import { Excursion } from '../../../core/models/excursion.model';
import { AuthService } from '../../../core/services/auth.service.ts';

@Component({
  selector: 'app-add-excursion',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-excursion.component.html',
  styleUrls: ['./add-excursion.component.scss']
})
export class AddExcursionComponent {
  private fb = inject(FormBuilder);
  private excursionService = inject(ExcursionsService);
  private auth = inject(AuthService);
  private router = inject(Router);

  step = signal(1); // 1: Info, 2: Ubicación, 3: Detalles, 4: Fotos/Precio

  form = this.fb.group({
    title: ['', Validators.required],
    category: ['adventure', Validators.required],
    description: ['', [Validators.required, Validators.minLength(50)]],
    city: ['', Validators.required],
    country: ['', Validators.required],
    duration: ['', Validators.required],
    price: [0, [Validators.required, Validators.min(1)]],
    imageUrl: ['', Validators.required], // URL directa por ahora
    highlights: this.fb.array([this.fb.control('')])
  });

  get highlights() { return this.form.get('highlights') as FormArray; }

  addHighlight() { this.highlights.push(this.fb.control('')); }
  removeHighlight(index: number) { this.highlights.removeAt(index); }

  next() { this.step.update(s => s + 1); }
  back() { this.step.update(s => s - 1); }

  submit() {
    if (this.form.invalid) return;

    const val = this.form.value;
    const currentUser = this.auth.currentUser();

    // Crear objeto Excursion Mockeado
    const newExcursion: Excursion = {
      id: Math.random().toString(36).substr(2, 9),
      slug: val.title!.toLowerCase().replace(/ /g, '-'),
      title: val.title!,
      shortDescription: val.description!.substring(0, 100) + '...',
      fullDescription: val.description!,
      category: val.category as any,
      location: { city: val.city!, country: val.country!, region: 'Global', coords: {lat:0, lng:0} },
      price: val.price!,
      duration: val.duration!,
      imageUrl: val.imageUrl!,
      galleryImages: [],
      highlights: (val.highlights as string[]).filter(h => h.length > 0),
      includes: ['Guía', 'Seguro'], // Default
      notIncludes: ['Propina'],
      rating: 0,
      reviewsCount: 0,
      isFeatured: false,
      freeCancellation: true,
      instantConfirmation: false,
      vendor: {
        id: currentUser?.id || 'v1',
        name: currentUser?.name || 'Agencia',
        logoUrl: currentUser?.avatar || '',
        verified: true,
        joinedDate: new Date(),
        rating: 5.0
      }
    };

    this.excursionService.addExcursion(newExcursion);
    alert('¡Excursión publicada exitosamente!');
    this.router.navigate(['/vendor/dashboard']);
  }
}