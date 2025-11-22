import { Routes } from '@angular/router';
import { BlogComponent } from './blog.component';
// Importa el componente de detalle (asegúrate de que la ruta sea correcta)
import { BlogDetailComponent } from './blog-detail/blog-detail.component';

export const BLOG_ROUTES: Routes = [
  { path: '', component: BlogComponent },
  // Agrega esta línea para que coincida con la configuración del servidor
  { path: ':slug', component: BlogDetailComponent }
];