import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Filter } from '../models/subdivision';
import { SubdivisonService } from '../services/subdivison.service';
import { ProductResponse } from '../models/Product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'web';
  filterObj = {
    start : 0,
    limit : environment.pageLimit,
    filter: '',
    sortorder: '',
    sortby: '',
  }
  productResponse: ProductResponse = {
    products: [],
    totalRecords: 0
  };
  constructor(private subdivisionsService: SubdivisonService) {
    this.getSubdivisions();
    this.productResponse.products = [];
  }

  ngOnInit(): void {
  }

  getSubdivisions() {
    this.subdivisionsService.getProducts(this.filterObj.start, this.filterObj.limit, this.filterObj.filter, this.filterObj.sortorder, this.filterObj.sortby)
      .subscribe({
        next: (products: ProductResponse) => {
          if (this.productResponse.products.length === 0) {
            this.productResponse = products;
          } else {
            this.productResponse.products = [... this.productResponse.products, ...products.products]
            this.productResponse.totalRecords = products.totalRecords;
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
    this.productResponse.products = [];
    this.productResponse.totalRecords = 0;
    this.getSubdivisions();
  }
}
