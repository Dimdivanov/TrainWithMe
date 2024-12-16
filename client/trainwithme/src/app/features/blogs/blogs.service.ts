import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Theme, User } from '../../types/post';

@Injectable()
export class BlogsService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Theme[]>(`/api/themes`);
  }
  getSingleBlog(id: string) {
    return this.http.get<Theme>(`/api/themes/${id}`);
  }
  //todo take the user id profile
  getBlogCreator(id: string) {
    return this.http.get<User>(`/api/${id}`);
  }
  
}
