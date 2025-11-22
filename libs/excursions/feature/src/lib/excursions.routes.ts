import { Routes } from '@angular/router';
import { ExcursionListComponent } from './excursion-list/excursion-list.component';
import { ExcursionDetailComponent } from './excursion-detail/excursion-detail.component';

export const EXCURSION_ROUTES: Routes = [
  { path: '', component: ExcursionListComponent },
  { path: ':slug', component: ExcursionDetailComponent }
];
