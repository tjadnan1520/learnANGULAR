import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';  
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../models/user';

@Component({
  selector: 'app-register-template',
  templateUrl: './register-template.component.html',
  styleUrls: ['./register-template.component.css'],
  standalone: false
})
export class RegisterTemplateComponent {

  user: User = {
    name: '',
    address: '',
    email: '',
    password: ''
  };

  successMessage: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  onSubmit(form: NgForm): void {
    this.successMessage = '';
    this.errorMessage = '';

    
    if (form.invalid) {
      
      
      Object.values(form.controls).forEach(control => {
        control.markAsTouched();
      });
      return;
    }

    this.isLoading = true;

    
    this.userService.registerUser(this.user).subscribe({
      next: (createdUser) => {
        this.isLoading = false;
        this.successMessage = `Account created! Welcome, ${createdUser.name}! Redirecting...`;

        
        form.resetForm();
        this.user = { name: '', address: '', email: '', password: '' };

        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = 'Registration failed. Please try again.';
        console.error('Register error:', err);
      }
    });
  }
}