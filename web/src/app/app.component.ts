import { Component, OnInit } from '@angular/core';
import { SubdivisonService } from './services/subdivison.service';
import { Filter, Options, Subdivision, SubdivisionResponse } from './models/subdivision';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'web';
  filterObj = {
    start : 0,
    limit : environment.pageLimit,
    filter: '',
    sortorder: '',
    sortby: '',
  }
  subdivisionsResponse: SubdivisionResponse = {
    subdivisions: [],
    totalRecords: 0
  };
  constructor(private subdivisionsService: SubdivisonService) {
    this.getSubdivisions();
    this.subdivisionsResponse.subdivisions = [];
  }

  ngOnInit(): void {
  }

  getSubdivisions() {
    this.subdivisionsService.getSubdivisions(this.filterObj.start, this.filterObj.limit, this.filterObj.filter, this.filterObj.sortorder, this.filterObj.sortby)
      .subscribe({
        next: (subdivisions: SubdivisionResponse) => {
          if (this.subdivisionsResponse.subdivisions.length === 0) {
            this.subdivisionsResponse = subdivisions;
          } else {
            this.subdivisionsResponse.subdivisions = [... this.subdivisionsResponse.subdivisions, ...subdivisions.subdivisions]
            this.subdivisionsResponse.totalRecords = subdivisions.totalRecords;
          }
        },
        error: (err: Error) => console.error(err),
        complete: () => { }
      });
  }

  onScroll(e: Event) {
    this.filterObj.start +=  environment.pageLimit;
    this.getSubdivisions();
  }

  filterData(e: Filter) {
    this.filterObj = e;
    console.log(this.filterObj)
    this.subdivisionsResponse.subdivisions = [];
    this.subdivisionsResponse.totalRecords = 0;
    this.getSubdivisions();
  }

  
}
