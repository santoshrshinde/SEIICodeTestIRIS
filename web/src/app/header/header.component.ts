import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SubdivisonService } from '../services/subdivison.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: false
})
export class HeaderComponent implements OnInit {

  profileData: any;

  constructor(private subdivisonService: SubdivisonService,
    private router: Router) { }

  ngOnInit(): void {
    this.getProfile();
  }

  getProfile() {
    const uInfo: any = sessionStorage.getItem('user_info');
    const user_info = JSON.parse(uInfo);
    if(!user_info) return
    this.subdivisonService.getUserById(user_info.user_id).subscribe({
      next: (data) => {
        this.profileData = data;
      },
      error: (error) => {
        console.error('Error fetching profile data', error);
      }
    });
  }
}
