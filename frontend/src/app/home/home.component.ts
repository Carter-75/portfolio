import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  private api = inject(ApiService);

  ngOnInit() {
    this.checkConnectivity();
  }

  /** Silent health-check — no debug logging in production */
  private checkConnectivity() {
    this.api.getData<{ status: string }>('ping').subscribe();
  }
}
