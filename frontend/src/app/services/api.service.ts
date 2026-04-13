import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient);
  
  // Dynamic API URL mapping
  private get apiUrl(): string {
    return environment.apiUrl;
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
  postData<T>(endpoint: string, body: Record<string, unknown>): Observable<T> {
    return this.http.post<T>(`${this.apiUrl}/${endpoint}`, body);
  }
}
