import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterReactiveComponent } from './register-reactive.component';


const routes: Routes = [
  { path: '', component: RegisterReactiveComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterReactiveRoutingModule { }