import { Component, OnInit } from '@angular/core';
import { SubdivisonService } from './services/subdivison.service';

import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false
})
export class AppComponent implements OnInit {
  title = 'web';
  ngOnInit(): void {
      
  }
  
}
