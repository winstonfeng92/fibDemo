import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FibComponent } from './fib.component';

describe('FibComponent', () => {
  let component: FibComponent;
  let fixture: ComponentFixture<FibComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FibComponent]
    });
    fixture = TestBed.createComponent(FibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
