import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const platformId = inject(PLATFORM_ID);

  // CORRECCIÓN: Verificar si estamos en el navegador antes de usar localStorage
  if (isPlatformBrowser(platformId)) {
    const token = localStorage.getItem('auth_token');
    if (token) {
      const cloned = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
      return next(cloned);
    }
  }

  return next(req);
};