import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private auth: AuthService, private router: Router) { }

  onLogin() {
    if (this.username && this.password) {
      this.auth.login(this.username, this.password).subscribe({
        next: (res) => {
          if (res.status === "success") {
            this.router.navigateByUrl('/home');
          } else {
            alert('Invalid credentials');
          }
        },
        error: (err) => {
          console.error('Login error:', err);
          alert('Login failed. Please try again.');
        }
      });
    } else {
      alert('Please enter username and password');
    }
  }

  onReset() {
    this.username = '';
    this.password = '';
  }
}
