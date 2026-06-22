import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },

  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then(m => m.HomeModule)
  },

  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then(m => m.LoginModule)
  },

  
  {
    path: 'register-reactive',
    loadChildren: () =>
      import('./register-reactive/register-reactive.module')
        .then(m => m.RegisterReactiveModule)
  },

  
  {
    path: 'register-template',
    loadChildren: () =>
      import('./register-template/register-template.module')
        .then(m => m.RegisterTemplateModule)
  },

  {
    path: 'profile',
    loadChildren: () =>
      import('./profile/profile.module').then(m => m.ProfileModule)
  },

  
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }