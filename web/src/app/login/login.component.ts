import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { SubdivisonService } from '../services/subdivison.service';
import { DialogService } from '../services/dialog.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: false
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private subdivisonService: SubdivisonService,
    private dialogService: DialogService
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {

  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;
   
    this.subdivisonService.login(this.loginForm.value).subscribe({
      next: (response) => {
        sessionStorage.setItem('user_info', JSON.stringify({token: response.token, user_id: response.user_id}));
        this.dialogService.closeDialog();
      },
      error: (error) => {
        console.error('Login failed', error);
      }
    });
  }



}
