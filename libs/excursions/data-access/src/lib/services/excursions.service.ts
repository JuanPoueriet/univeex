import { Injectable, signal } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Excursion } from '@univeex/shared/data-access';

export const EXCURSIONS_DATA: Excursion[] = [
  {
    id: '1',
    slug: 'torre-eiffel-acceso-cumbre',
    title: 'Torre Eiffel: Acceso Directo a la Cima',
    shortDescription: 'Evita las colas y sube directamente al punto más alto de París.',
    fullDescription: 'Disfruta de las mejores vistas de París desde el segundo piso y la cima de la Torre Eiffel. Incluye guía experto que te contará la historia del monumento más famoso del mundo.',
    price: 65,
    duration: '3 Horas',
    rating: 4.9,
    reviewsCount: 3540,
    imageUrl: 'https://images.unsplash.com/photo-1511739001486-91d91467b1c8?q=80&w=1000&auto=format&fit=crop',
    galleryImages: [],
    highlights: ['Acceso Prioritario', 'Guía en Español', 'Vistas Panorámicas'],
    includes: ['Entrada a la Cima', 'Guía Histórico'],
    notIncludes: ['Propina', 'Transporte al hotel'],
    category: 'culture',
    isFeatured: true,
    location: { city: 'París', country: 'Francia', region: 'Europa', coords: { lat: 48.858, lng: 2.294 } },
    vendor: { id: 'v1', name: 'Paris Mágico Tours', logoUrl: 'https://ui-avatars.com/api/?name=Paris+Tours&background=0D8ABC&color=fff', verified: true, joinedDate: new Date('2020-01-01'), rating: 4.8 },
    freeCancellation: true,
    instantConfirmation: true
  },
  {
    id: '2',
    slug: 'clase-sushi-tokio',
    title: 'Clase Maestra de Sushi en Tsukiji',
    shortDescription: 'Aprende a hacer sushi auténtico con un maestro chef japonés.',
    fullDescription: 'Visita el mercado de pescado más famoso del mundo y luego prepara 3 tipos de sushi tradicional bajo la tutela de un maestro con 30 años de experiencia.',
    price: 120,
    duration: '4 Horas',
    rating: 5.0,
    reviewsCount: 420,
    imageUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=1000&auto=format&fit=crop',
    galleryImages: [],
    highlights: ['Mercado Tsukiji', 'Degustación', 'Diploma de Sushi'],
    includes: ['Ingredientes Frescos', 'Almuerzo', 'Sake'],
    notIncludes: ['Traslados'],
    category: 'food',
    isFeatured: true,
    location: { city: 'Tokio', country: 'Japón', region: 'Asia', coords: { lat: 35.676, lng: 139.650 } },
    vendor: { id: 'v2', name: 'Tokyo Local Guides', logoUrl: 'https://ui-avatars.com/api/?name=Tokyo+Guides&background=FF5733&color=fff', verified: true, joinedDate: new Date('2021-05-15'), rating: 4.9 },
    freeCancellation: false,
    instantConfirmation: true
  },
  {
    id: '3',
    slug: 'saona-island-paradise',
    title: 'Isla Saona VIP Catamarán',
    shortDescription: 'La clásica experiencia caribeña con todo incluido.',
    fullDescription: 'Navegación por el mar Caribe, parada en piscina natural con estrellas de mar, almuerzo buffet en playa privada y barra libre nacional.',
    price: 85,
    duration: '8 Horas',
    rating: 4.7,
    reviewsCount: 1500,
    imageUrl: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?q=80&w=1000&auto=format&fit=crop',
    galleryImages: [],
    highlights: ['Barra Libre', 'Piscina Natural', 'Langosta'],
    includes: ['Transporte Hotel', 'Comida Buffet', 'Bebidas Ilimitadas'],
    notIncludes: ['Fotos Profesionales'],
    category: 'nature',
    isFeatured: true,
    location: { city: 'Punta Cana', country: 'República Dominicana', region: 'Caribe', coords: { lat: 18.560, lng: -68.372 } },
    vendor: { id: 'v3', name: 'Caribe Dreams', logoUrl: 'https://ui-avatars.com/api/?name=Caribe+Dreams&background=28B463&color=fff', verified: true, joinedDate: new Date('2019-11-20'), rating: 4.5 },
    freeCancellation: true,
    instantConfirmation: false
  },
  {
    id: '4',
    slug: 'safari-desierto-dubai',
    title: 'Safari 4x4 en Dunas Rojas',
    shortDescription: 'Adrenalina en el desierto con cena BBQ y show.',
    fullDescription: 'Dune bashing en 4x4, sandboarding por las dunas rojas, paseo en camello al atardecer y cena buffet con espectáculo de fuego y danza del vientre.',
    price: 55,
    originalPrice: 75,
    duration: '6 Horas',
    rating: 4.8,
    reviewsCount: 8900,
    imageUrl: 'https://images.unsplash.com/photo-1451337516015-6b6e9a44a8a3?q=80&w=1000&auto=format&fit=crop',
    galleryImages: [],
    highlights: ['Dune Bashing', 'Cena BBQ', 'Show de Fuego'],
    includes: ['Transporte 4x4', 'Cena Buffet', 'Bebidas sin alcohol'],
    notIncludes: ['Alcohol', 'Quads (Opcional)'],
    category: 'adventure',
    isFeatured: false,
    location: { city: 'Dubái', country: 'EAU', region: 'Medio Oriente', coords: { lat: 25.204, lng: 55.270 } },
    vendor: { id: 'v4', name: 'Arabian Nights', logoUrl: 'https://ui-avatars.com/api/?name=Arabian+Nights&background=D35400&color=fff', verified: true, joinedDate: new Date('2018-08-10'), rating: 4.7 },
    freeCancellation: true,
    instantConfirmation: true
  }
];

@Injectable({ providedIn: 'root' })
export class ExcursionsService {
  private excursionsSignal = signal<Excursion[]>(EXCURSIONS_DATA);

  getExcursions(): Observable<Excursion[]> {
    return of(this.excursionsSignal());
  }

  getFeaturedExcursions(): Observable<Excursion[]> {
    return of(this.excursionsSignal().filter(e => e.isFeatured));
  }

  getExcursionBySlug(slug: string): Observable<Excursion | undefined> {
    return of(this.excursionsSignal().find(e => e.slug === slug));
  }

  getExcursionById(id: string): Observable<Excursion | undefined> {
    return of(this.excursionsSignal().find(e => e.id === id));
  }

  addExcursion(excursion: Excursion) {
    this.excursionsSignal.update(list => [excursion, ...list]);
  }

  getVendorExcursions(vendorId: string): Observable<Excursion[]> {
    return of(this.excursionsSignal().filter(e => e.vendor.id === vendorId));
  }
}
