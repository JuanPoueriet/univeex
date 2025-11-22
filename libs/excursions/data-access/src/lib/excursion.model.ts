export interface Vendor {
  id: string;
  name: string;
  logoUrl: string;
  verified: boolean;
  joinedDate: Date;
  rating: number;
}

export interface Location {
  city: string;
  country: string;
  region: string;
  coords: { lat: number; lng: number };
}

export interface Review {
  id: string;
  authorName: string;
  authorAvatar: string;
  rating: number;
  comment: string;
  date: Date;
}

export interface Excursion {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  price: number;
  originalPrice?: number;
  duration: string;
  rating: number;
  reviewsCount: number;
  imageUrl: string;
  galleryImages: string[];
  highlights: string[];
  includes: string[];
  notIncludes: string[];
  category: 'adventure' | 'food' | 'culture' | 'nature' | 'water' | 'relaxation' | 'family';
  isFeatured: boolean;
  location: Location;
  vendor: Vendor;
  freeCancellation: boolean;
  instantConfirmation: boolean;
  reviews?: Review[]; // Nuevo
}