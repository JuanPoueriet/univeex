import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  sendMessage(message: ContactMessage): Observable<boolean> {
    console.log('Sending message:', message);
    return of(true);
  }
}
