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
    page : 0,
    pageSize : environment.pageLimit,
    filterValue: '',
    sortorder: '',
    filterColumn: '',
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
    this.subdivisionsService.getProducts(this.filterObj.page, this.filterObj.pageSize, this.filterObj.filterValue, this.filterObj.sortorder, this.filterObj.filterColumn)
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
    this.filterObj.page +=  environment.pageLimit;
    this.getSubdivisions();
  }

  filterData(e: Filter) {
    this.filterObj = e;
    this.productResponse.products = [];
    this.productResponse.totalRecords = 0;
    this.getSubdivisions();
  }
}
