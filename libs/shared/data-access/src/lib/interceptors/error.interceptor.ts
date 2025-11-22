import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'Ocurrió un error desconocido';

      if (error.error instanceof ErrorEvent) {
        errorMessage = `Error: ${error.error.message}`;
      } else {
        switch (error.status) {
          case 404: errorMessage = 'Recurso no encontrado'; break;
          case 500: errorMessage = 'Error interno del servidor'; break;
          case 401: errorMessage = 'No autorizado'; break;
          default: errorMessage = `Código: ${error.status}, Mensaje: ${error.message}`;
        }
      }

      console.error('🚨 Error interceptado:', errorMessage);
      return throwError(() => new Error(errorMessage));
    })
  );
};
