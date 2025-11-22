import { Component, Input, inject, signal, effect, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BlogService, BlogPost } from '@univeex/blog/data-access';

@Component({
  selector: 'univeex-blog-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './blog-detail.component.html',
  styleUrl: './blog-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogDetailComponent {
  private blogService = inject(BlogService);

  // Input signal would be nicer but sticking to @Input for compat or switch to input()
  @Input() set slug(value: string) {
    if (value) {
      this.blogService.getPostBySlug(value).subscribe(post => this.post.set(post));
    }
  }

  post = signal<BlogPost | undefined>(undefined);
}
