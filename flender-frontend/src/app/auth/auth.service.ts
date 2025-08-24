import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly KEY = 'auth';
  private readonly apiUrl = 'http://localhost:8080/auth/login'; // 👈 replace with your backend login endpoint

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    console.log(username, password)
    return this.http.post<any>(this.apiUrl, { username, password }).pipe(
      tap((res) => {
        if (res.status === "success") {
          localStorage.setItem(this.KEY, JSON.stringify({
            username: res.user ?? username,
            loggedInAt: Date.now()
          }));
        } else {
        }
      })
    );
  }

  isLoggedIn(): boolean {
    return localStorage.getItem(this.KEY) !== null;
  }

  getUsername(): string | null {
    const raw = localStorage.getItem(this.KEY);
    if (!raw) return null;
    try {
      const data = JSON.parse(raw);
      return data?.username ?? null;
    } catch {
      return null;
    }
  }

  getToken(): string | null {
    const raw = localStorage.getItem(this.KEY);
    if (!raw) return null;
    try {
      const data = JSON.parse(raw);
      return data?.token ?? null;
    } catch {
      return null;
    }
  }

  logout(): void {
    localStorage.removeItem(this.KEY);
  }
}
