import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface BlogPost {
  slug: string;
  title: string;
  summary: string;
  content: string;
  imageUrl: string;
  date: Date;
}

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private posts: BlogPost[] = [
    {
      slug: 'best-time-to-visit-punta-cana',
      title: 'Best Time to Visit Punta Cana',
      summary: 'Learn about the weather and seasons in Punta Cana to plan your perfect trip.',
      content: 'Full content goes here...',
      imageUrl: 'assets/images/punta-cana-beach.jpg',
      date: new Date('2023-10-15')
    }
  ];

  getPosts(): Observable<BlogPost[]> {
    return of(this.posts);
  }

  getPostBySlug(slug: string): Observable<BlogPost | undefined> {
    return of(this.posts.find(p => p.slug === slug));
  }
}
