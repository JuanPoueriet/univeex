import { Injectable, signal, computed, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'guest' | 'user' | 'vendor';
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  // Estado reactivo del usuario
  currentUser = signal<User | null>(null);

  isLoggedIn = computed(() => !!this.currentUser());
  isVendor = computed(() => this.currentUser()?.role === 'vendor');

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    // CORRECCIÓN: Solo acceder a localStorage en el navegador
    if (isPlatformBrowser(this.platformId)) {
      const stored = localStorage.getItem('mock_user');
      if (stored) {
        try {
            this.currentUser.set(JSON.parse(stored));
        } catch (e) {
            console.error('Error parsing user data', e);
        }
      }
    }
  }

  loginAsUser() {
    const user: User = {
      id: 'u1',
      name: 'Viajero Demo',
      email: 'viajero@test.com',
      avatar: 'https://ui-avatars.com/api/?name=Viajero+Demo&background=random',
      role: 'user'
    };
    this.saveUser(user);
  }

  loginAsVendor() {
    const user: User = {
      id: 'v1',
      name: 'Agencia Global',
      email: 'partner@test.com',
      avatar: 'https://ui-avatars.com/api/?name=Agencia+Global&background=0D8ABC&color=fff',
      role: 'vendor'
    };
    this.saveUser(user);
  }

  logout() {
    this.currentUser.set(null);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('mock_user');
    }
  }

  private saveUser(user: User) {
    this.currentUser.set(user);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('mock_user', JSON.stringify(user));
    }
  }
}