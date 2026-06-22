import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterReactiveRoutingModule } from './register-reactive-routing.module';
import { RegisterReactiveComponent } from './register-reactive.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [RegisterReactiveComponent],
  imports: [
    CommonModule,
    RegisterReactiveRoutingModule,
    ReactiveFormsModule    
  ]
})
export class RegisterReactiveModule { }