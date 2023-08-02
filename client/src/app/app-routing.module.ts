import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { FibComponent } from './fib/fib.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'fib', component: FibComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
