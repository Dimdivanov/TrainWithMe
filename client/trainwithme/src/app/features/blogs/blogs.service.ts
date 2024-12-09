import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments.development';
import { Post } from '../../types/post';

@Injectable()
export class BlogsService {
  constructor(private http: HttpClient) {}

  getAll() {
    const { apiUrl } = environment;
    return this.http.get<Post[]>(`${apiUrl}/posts`);
  }
}
