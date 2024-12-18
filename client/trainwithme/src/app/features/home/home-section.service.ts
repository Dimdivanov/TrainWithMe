import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Theme } from '../../types/post';

@Injectable({
  providedIn: 'root',
})
export class HomeSectionService {
  constructor(private http: HttpClient) {}

  getPosts() {
    let url = '/api/themes';
    return this.http.get<Theme[]>(url);
  }
}
