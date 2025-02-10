import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Filter, Options } from './../models/subdivision';
import { environment } from 'src/environments/environment';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  // @ViewChild("form") public ngForm!: NgForm;
  @Input('filter') filterObj: Filter;
  @Output('filterChange') filterChange = new EventEmitter();

  sortOptions: Options[] = [
    { value: 'none', viewValue: 'Select' },
    { value: 'asc', viewValue: 'Ascending' },
    { value: 'dsc', viewValue: 'Descending ' },
  ];
  orderByOptions: Options[] = [
    { value: 'none', viewValue: 'Select' },
    { value: 'name', viewValue: 'Name' },
    { value: 'nearmapimagedate', viewValue: 'Near Map Image Date ' },
  ];
  filterByOptions: Options[] = [
    { value: '', viewValue: 'Select' },
    { value: 'Active', viewValue: 'Active' },
    { value: 'Future ', viewValue: 'Future' },
    { value: 'Builtout', viewValue: 'Builtout' },
  ];

  constructor() {
    this.filterObj = {
      page : 0,
      pageSize : 0,
      filterValue: '',
      sortorder: '',
      filterColumn: '',
    };
   }

  ngOnInit(): void {

  }

  clear() {
    this.filterObj = {
      page : 0,
      pageSize : environment.pageLimit,
      filterValue: '',
      sortorder: '',
      filterColumn: '',
    };
    this.filterChange.emit(this.filterObj);
  }

  filterData() {
    // console.log('Form submitted!',this.filterObj);
    this.filterObj.page= 0;
    this.filterChange.emit(this.filterObj);
  }

}
