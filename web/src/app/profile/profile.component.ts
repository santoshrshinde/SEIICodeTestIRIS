import { Component, OnInit } from '@angular/core';
import { SubdivisonService } from '../services/subdivison.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileData: any;

  constructor(private subdivisonService: SubdivisonService) { }

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
