import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import { LoadingService } from './loading.service';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);

  // Ignorar archivos de traducción y assets para no bloquear UI innecesariamente
  if (req.url.includes('/assets/') || req.url.includes('.json')) {
    return next(req);
  }

  loadingService.show();
  return next(req).pipe(finalize(() => loadingService.hide()));
};
