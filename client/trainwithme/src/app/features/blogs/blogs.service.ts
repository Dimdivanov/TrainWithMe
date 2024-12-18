import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Theme } from '../../types/post';

@Injectable()
export class BlogsService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Theme[]>(`/api/themes`);
  }
  getSingleBlog(id: string) {
    return this.http.get<Theme>(`/api/themes/${id}`);
  }
  // fetch themes for blog page
  getThemes() {
    let url = '/api/themes';
    return this.http.get<Theme[]>(url);
  }
}
