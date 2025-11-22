import { Injectable, signal, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Excursion, Location, Vendor } from '../excursion.model';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ExcursionsService {
  private http = inject(HttpClient);
  private apiUrl = '/api/excursions';

  private mapBackendToFrontend(tour: any): Excursion {
    return {
      id: tour.id,
      slug: tour.slug,
      title: tour.title,
      shortDescription: tour.description.substring(0, 100) + '...', // Simplified logic
      fullDescription: tour.description,
      price: Number(tour.price),
      originalPrice: Number(tour.price) * 1.2, // Mocked
      duration: tour.duration + ' Mins',
      rating: 4.5, // Mocked as DB doesn't have ratings yet
      reviewsCount: 0,
      imageUrl: 'https://images.unsplash.com/photo-1511739001486-91d91467b1c8', // Placeholder if no image
      galleryImages: [],
      highlights: [],
      includes: [],
      notIncludes: [],
      category: 'culture', // Default
      isFeatured: false,
      location: {
        city: tour.city,
        country: tour.country,
        region: 'Unknown',
        coords: { lat: 0, lng: 0 }
      },
      vendor: {
        id: tour.provider?.id || 'unknown',
        name: tour.provider?.companyName || 'Unknown Vendor',
        logoUrl: '',
        verified: tour.provider?.verified || false,
        joinedDate: new Date(),
        rating: 0
      },
      freeCancellation: true,
      instantConfirmation: true
    };
  }

  getExcursions(): Observable<Excursion[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(tours => tours.map(this.mapBackendToFrontend))
    );
  }

  getFeaturedExcursions(): Observable<Excursion[]> {
    return this.getExcursions();
  }

  getExcursionBySlug(slug: string): Observable<Excursion | undefined> {
    return this.http.get<any>(`${this.apiUrl}/${slug}`).pipe(
      map(this.mapBackendToFrontend)
    );
  }

  getExcursionById(id: string): Observable<Excursion | undefined> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
       map(this.mapBackendToFrontend)
    );
  }

  addExcursion(excursion: Excursion): Observable<Excursion> {
    // This needs to map Frontend model back to Backend DTO
    // For now, sending as is, backend will likely reject or error if types don't match
    // We need to fix the create component to send the correct structure
    return this.http.post<any>(this.apiUrl, excursion).pipe(map(this.mapBackendToFrontend));
  }

  uploadImage(file: File): Observable<{ url: string }> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<{ url: string }>('/api/uploads/image', formData);
  }

  getVendorExcursions(vendorId: string): Observable<Excursion[]> {
    return this.http.get<any[]>(`${this.apiUrl}?vendorId=${vendorId}`).pipe(
        map(tours => tours.map(this.mapBackendToFrontend))
    );
  }
}
