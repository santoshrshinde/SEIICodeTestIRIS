import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: false
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  apiUrl = 'https://your-backend-api-url/login'; // Your backend API URL

  constructor(
    private fb: FormBuilder,
    private http: HttpClient
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    const loginData = this.loginForm.value;
    this.login(loginData).subscribe(
      (response) => {
        console.log('Login successful', response);
        // Handle successful login response (e.g., store tokens, navigate, etc.)
      },
      (error) => {
        console.error('Login failed', error);
        // Handle login error (e.g., show error message)
      }
    );
  }

  login(credentials: any): Observable<any> {
    return this.http.post(this.apiUrl, credentials);
  }

}
