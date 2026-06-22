import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register-reactive',
  templateUrl: './register-reactive.component.html',
  styleUrls: ['./register-reactive.component.css'],
  standalone: false
})
export class RegisterReactiveComponent implements OnInit {

  registerForm!: FormGroup;

  successMessage: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required,Validators.minLength(2)]],
      address: ['', [Validators.required]],
      email: ['', [Validators.required,Validators.email]],
      password: ['', [Validators.required,Validators.minLength(6)]]
    });
  }

  get name() { return this.registerForm.get('name'); }
  get address() { return this.registerForm.get('address'); }
  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }


  onSubmit(): void {
    this.successMessage = '';
    this.errorMessage = '';

    this.registerForm.markAllAsTouched();

    
    if (this.registerForm.invalid) {
      return;
    }

    this.isLoading = true;
    const newUser = this.registerForm.value;

    this.userService.registerUser(newUser).subscribe({
      next: (createdUser) => {
        
        this.isLoading = false;
        this.successMessage = `Account created successfully! Welcome, ${createdUser.name}! Redirecting to login...`;

        
        this.registerForm.reset();

        
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = 'Registration failed. Make sure JSON Server is running on port 3000.';
        console.error('Register error:', err);
      }
    });
  }
}