import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterTemplateComponent } from './register-template.component';


const routes: Routes = [
  { path: '', component: RegisterTemplateComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterTemplateRoutingModule { }