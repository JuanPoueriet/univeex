import { Injectable, signal, computed, Inject, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  // Frontend compatibility properties
  name?: string;
  avatar?: string;
  role: 'USER' | 'ADMIN' | 'PROVIDER';
  accessToken?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = '/api'; // Proxy should handle this in dev, or use env vars

  currentUser = signal<User | null>(null);

  isLoggedIn = computed(() => !!this.currentUser());
  isVendor = computed(() => this.currentUser()?.role === 'PROVIDER');

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      const stored = localStorage.getItem('user_data');
      if (stored) {
        try {
            this.currentUser.set(JSON.parse(stored));
        } catch (e) {
            console.error('Error parsing user data', e);
        }
      }
    }
  }

  login(credentials: {email: string, password: string}): Observable<any> {
    return this.http.post<{access_token: string}>(`${this.apiUrl}/auth/login`, credentials).pipe(
      tap(response => {
        // After getting token, we might want to get user profile or decode token
        // For now, let's assume we just store the token and decode/fetch user
        this.fetchProfile(response.access_token).subscribe();
      })
    );
  }

  register(data: any): Observable<any> {
      return this.http.post(`${this.apiUrl}/auth/register`, data);
  }

  fetchProfile(token: string): Observable<User> {
      // Manually setting header here for simplicity, better in interceptor
      return this.http.get<User>(`${this.apiUrl}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` }
      }).pipe(
          tap(user => {
              const userWithToken: User = {
                  ...user,
                  accessToken: token,
                  name: `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.email,
                  avatar: `https://ui-avatars.com/api/?name=${user.firstName || 'U'}`
              };
              this.saveUser(userWithToken);
          })
      );
  }

  logout() {
    this.currentUser.set(null);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('user_data');
    }
  }

  private saveUser(user: User) {
    this.currentUser.set(user);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('user_data', JSON.stringify(user));
    }
  }

  // Legacy/Demo methods - replaced by real login but kept for compatibility with existing UI buttons until updated
  loginAsUser() {
      // Demo user login - should be replaced by UI modal with form
      // For now, we just create a dummy session or call login with hardcoded creds if they existed
      console.warn('loginAsUser is deprecated. Use login()');
      const demoUser: User = {
          id: 'demo-user',
          email: 'user@demo.com',
          firstName: 'Demo',
          lastName: 'User',
          name: 'Demo User',
          avatar: 'https://ui-avatars.com/api/?name=Demo+User',
          role: 'USER',
          accessToken: 'demo-token'
      };
      this.saveUser(demoUser);
  }

  loginAsVendor() {
      console.warn('loginAsVendor is deprecated. Use login()');
      const demoVendor: User = {
          id: 'demo-vendor',
          email: 'vendor@demo.com',
          firstName: 'Demo',
          lastName: 'Vendor',
          name: 'Demo Vendor',
          avatar: 'https://ui-avatars.com/api/?name=Demo+Vendor',
          role: 'PROVIDER',
          accessToken: 'demo-token'
      };
      this.saveUser(demoVendor);
  }
}
