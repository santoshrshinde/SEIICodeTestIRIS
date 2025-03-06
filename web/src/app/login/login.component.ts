import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  isError: boolean = false;
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
        if(response.success){
          this.isError = false;
          sessionStorage.setItem('user_info', JSON.stringify({token: response.token, user_id: response.user_id}));
          this.dialogService.closeDialog();
        } else {
          this.isError = true;
        }
      },
      error: (error) => {
        this.isError = true;
        console.error('Login failed', error);
        setTimeout(() => {
          this.isError = false;
        }, 3000);
      }
    });
  }



}
