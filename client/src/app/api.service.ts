import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://localhost:3001/api/fibonacci';
  private fibonacciNumbersSubject = new BehaviorSubject<any[]>([]);

  constructor(private http: HttpClient) {}

  generateFibonacciNumbers(n: number): void {
    this.http.post(this.apiUrl, { n }).subscribe((response: any) => {
      console.log(response);
      this.fibonacciNumbersSubject.next(response);
    });
  }

  getFibonacciNumbers(): Observable<any[]> {
    return this.fibonacciNumbersSubject.asObservable();
  }
}
