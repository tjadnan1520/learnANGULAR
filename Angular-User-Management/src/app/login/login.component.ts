import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: false
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  errorMessage: string = '';
  successMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,        
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {}

  
  
  ngOnInit(): void {
    this.initForm();

    
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/profile']);
    }
  }

  initForm(): void {

    this.loginForm = this.fb.group({
      
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }
  
  onSubmit(): void {    
    this.errorMessage = '';
    this.successMessage = '';

    this.loginForm.markAllAsTouched();

    
    if (this.loginForm.invalid) {
      return;
    }

    this.isLoading = true;

    
    const { email, password } = this.loginForm.value;

    this.userService.getUserByEmail(email).subscribe({
      
      next: (users) => {
        this.isLoading = false;

        
        if (users.length === 0) {
          
          this.errorMessage = 'Invalid Email or Password.';
          return;
        }

        const user = users[0]; 

        if (user.password !== password) {
          this.errorMessage = 'Invalid Email or Password.';
          return;
        }

        this.authService.login(user);

        this.successMessage = `Welcome back, ${user.name}! Redirecting...`;

        
        setTimeout(() => {
          this.router.navigate(['/profile']);
        }, 1200);
      },

      
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = 'Server error. Make sure JSON Server is running on port 3000.';
        console.error('Login error:', err);
      }
    });
  }
}