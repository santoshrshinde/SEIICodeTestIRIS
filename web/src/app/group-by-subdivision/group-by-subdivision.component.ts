import { Component, OnInit } from '@angular/core';
import { SubdivisonService } from '../services/subdivison.service';
import { Subscription, concatMap, tap } from 'rxjs';

@Component({
  selector: 'app-group-by-subdivision',
  templateUrl: './group-by-subdivision.component.html',
  styleUrls: ['./group-by-subdivision.component.css'],
  standalone: false
})
export class GroupBySubdivisionComponent implements OnInit {

  groups:any = {};

  constructor(private subdivisonService: SubdivisonService) { }

  ngOnInit(): void {

    // this.getSubdivisionGroups();
    this.getGoups();

  }

  getGoups() {
    this.subdivisonService.getSubdivisionsByStatus('Active').pipe(
      tap((res) => console.log('Active result', res)),
      concatMap(() => this.subdivisonService.getSubdivisionsByStatus('Future')),
      tap((res) => console.log('Future result', res)),
      concatMap(() => this.subdivisonService.getSubdivisionsByStatus('Builtout')),
      tap((res) => console.log('Builtout result', res)),
    ).subscribe({
      next: (response) =>{
        this.groups = response;
        // console.log(this.groups);
      },
      error: () =>{

      },
    });
  }

  getSubdivisionGroups() {
    this.subdivisonService.getSubdivisionGroups().subscribe({
      next: (response) =>{
        this.groups = response;
        console.log(this.groups);
      },
      error: () =>{

      },
    });
  }


  

}
