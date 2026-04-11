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
    
    // In production, the backend is routed through /_/backend in vercel.json
    const base = isProd ? '/_/backend/api' : '/api';

    if (isProd && prodBackend && prodBackend !== '' && !prodBackend.includes('__PROD_')) {
      const url = prodBackend.endsWith('/') ? prodBackend.slice(0, -1) : prodBackend;
      return `${url}/api`;
    }

    return base;
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
