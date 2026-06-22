import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  standalone: false
})
export class ProfileComponent implements OnInit {

  users: User[] = [];
  loggedInUser: User | null = null;
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loggedInUser = this.authService.getLoggedInUser();
    this.loadUsers();
  }

  loadUsers(): void {
    this.isLoading = true;

    this.userService.getUsers().subscribe({
      next: (users) => {
        
        this.users = users;
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = 'Failed to load users. Make sure JSON Server is running on port 3000.';
        console.error('Profile load error:', err);
      }
    });
  }

  deleteUser(id: number | undefined): void {
    if (!id) return;

    
    if (!confirm('Are you sure you want to delete this user?')) return;

    this.userService.deleteUser(id).subscribe({
      next: () => {
        
        
        this.users = this.users.filter(u => u.id !== id);
      },
      error: (err) => {
        this.errorMessage = 'Failed to delete user.';
        console.error('Delete error:', err);
      }
    });
  }

  logout(): void {
    this.authService.logout();        
    this.router.navigate(['/login']); 
  }
}









