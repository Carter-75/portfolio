import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient);
  
  // Dynamic API URL mapping
  private get apiUrl(): string {
    const isProd = (String('__PRODUCTION__') === 'true');
    const prodBackend = String('__PROD_BACKEND_URL__');
    
    // In production, use the absolute URL if provided
    if (isProd) {
      if (prodBackend && prodBackend !== '' && !prodBackend.includes('__PROD_')) {
        return prodBackend.endsWith('/') ? prodBackend.slice(0, -1) + '/api' : prodBackend + '/api';
      }
    }

    // In development and as a production fallback, use relative /api.
    // Use window.location.origin to help diagnose absolute URL mismatches
    return '/api';
  }

  /**
   * Universal GET wrapper
   */
  getData<T>(endpoint: string): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}/${endpoint}`);
  }

  /**
   * Universal POST wrapper
   */
  postData<T>(endpoint: string, body: any): Observable<T> {
    return this.http.post<T>(`${this.apiUrl}/${endpoint}`, body);
  }
}
