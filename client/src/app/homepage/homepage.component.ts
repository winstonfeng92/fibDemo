import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent {
  n: number = 0;

  constructor(private router: Router, private apiService: ApiService) {}

  onSubmit(): void {
    if (this.n > 0) {
      this.apiService.generateFibonacciNumbers(this.n);
      this.router.navigate(['/fib']);
    }
  }
}
