import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fib',
  templateUrl: './fib.component.html',
  styleUrls: ['./fib.component.scss'],
})
export class FibComponent {
  fibonacciNumbers: number[] = [];
  fibNumbers$: Observable<any[]> = new Observable<any[]>();
  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.fibNumbers$ = this.apiService.getFibonacciNumbers();
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
