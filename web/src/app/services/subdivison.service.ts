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

  getSubdivisions(start: number, limit: number, filter: string, sortorder: string, sortby: string): Observable<SubdivisionResponse> {
    this.apiUrl = `${environment.apiUrl}/subdivisions?start=${start}&limit=${limit}&sortorder=${sortorder}&sortby=${sortby}&filter=${filter}`
    return this.http.get<SubdivisionResponse>(this.apiUrl);
  }
}
