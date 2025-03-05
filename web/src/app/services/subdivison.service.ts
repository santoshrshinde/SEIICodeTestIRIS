import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
// import { SubdivisionResponse } from '../models/subdivision';
import { Observable } from 'rxjs';
import { ProductResponse } from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export class SubdivisonService {
  private apiUrl = '';
  constructor(private http: HttpClient) { }

  /* getSubdivisions(start: number, limit: number, filter: string, sortorder: string, sortby: string) {
    this.apiUrl = `${environment.apiUrl}/subdivisions?start=${start}&limit=${limit}&sortorder=${sortorder}&sortby=${sortby}&filter=${filter}`
    return this.http.get<SubdivisionResponse>(this.apiUrl);
  } */
  getProducts(page: number, pageSize: number, search: string, orderDirection: string, orderBy: string) {
    this.apiUrl = `${environment.apiUrl}/api/products?search=${search}&page=${page}&pageSize=${pageSize}&sortBy=${orderBy}&orderDirection=${orderDirection}`
    // this.apiUrl = `${environment.apiUrl}/api/products?page=${start}&pageSize=${limit}&orderDirection=${sortorder}&orderBy=${sortby}&search=${filter}`
    return this.http.get<ProductResponse>(this.apiUrl);
  }

  getSubdivisionGroups() {
    this.apiUrl = `${environment.apiUrl}/subdivisions/group`
    return this.http.get(this.apiUrl);
  }

  getSubdivisionsByStatus(status: string) {
    this.apiUrl = `${environment.apiUrl}/subdivisions/subdivision_status_code?status=${status}`;
    return this.http.get(this.apiUrl);
  }
  // Cart
  addToCart(product: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/api/cart/add`, product);
  }
  // Cart
  removeFromCart(product: any): Observable<any> {
    console.log(product);
    return this.http.post(`${environment.apiUrl}/api/cart/delete`, product);
  }

  getCartItems(user_id: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/api/cart/all`, {user_id});
  }
  // users 
  login(credentials: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/api/users/login`, credentials);
  }

  getUserById(userId: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/users/${userId}`);
  }
}
