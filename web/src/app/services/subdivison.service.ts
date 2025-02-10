import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { SubdivisionResponse } from '../models/subdivision';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubdivisonService {
  private apiUrl = '';
  constructor(private http: HttpClient) { }

  getSubdivisions(start: number, limit: number, filter: string, sortorder: string, sortby: string) {
    this.apiUrl = `${environment.apiUrl}/subdivisions?start=${start}&limit=${limit}&sortorder=${sortorder}&sortby=${sortby}&filter=${filter}`
    return this.http.get<SubdivisionResponse>(this.apiUrl);
  }

  getSubdivisionGroups() {
    this.apiUrl = `${environment.apiUrl}/subdivisions/group`
    return this.http.get(this.apiUrl);
  }

  getSubdivisionsByStatus(status: string) {
    this.apiUrl = `${environment.apiUrl}/subdivisions/subdivision_status_code?status=${status}`;
    return this.http.get(this.apiUrl);
  }
}
