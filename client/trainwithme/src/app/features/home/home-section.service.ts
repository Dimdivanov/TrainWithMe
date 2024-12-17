import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Theme } from '../../types/post';

@Injectable({
  providedIn: 'root',
})
export class HomeSectionService {
  constructor(private http: HttpClient) {}

  getPosts(limit?: number) {
    let url = '/api/themes';
    if (limit) {
      url += `?limit=${limit}`;
    }
    return this.http.get<Theme[]>(url);
  }
  
}
