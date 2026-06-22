import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: false
})
export class HomeComponent {
 
  constructor(private router: Router) {}

  goToLogin(): void {
    this.router.navigate(['/login']);
  }

  goToRegisterReactive(): void {
    this.router.navigate(['/register-reactive']);
  }

  goToRegisterTemplate(): void {
    this.router.navigate(['/register-template']);
  }
}