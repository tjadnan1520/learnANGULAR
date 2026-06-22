import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterTemplateRoutingModule } from './register-template-routing.module';
import { RegisterTemplateComponent } from './register-template.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: 
  [RegisterTemplateComponent],
  imports: [
    CommonModule,
    RegisterTemplateRoutingModule,
    FormsModule    
  ]
})
export class RegisterTemplateModule { }