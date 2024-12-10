import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments.development';
import { Article, Theme, User } from '../../types/post';

@Injectable()
export class BlogsService {
  constructor(private http: HttpClient) {}

  getAll() {
    const { apiUrl } = environment;
    return this.http.get<Theme[]>(`${apiUrl}/themes`);
  }
  getSingleBlog(id: string) {
    const { apiUrl } = environment;
    return this.http.get<Theme>(`${apiUrl}/themes/${id}`);
  }
  //todo take the user id profile
  getBlogCreator(id: string) {
    const { apiUrl } = environment;
    return this.http.get<User>(`${apiUrl}/${id}`);
  }
  createArticle(
    articleTitle: string,
    imageUrl: string,
    placemment: string,
    articleContent: string
  ) {
    const { apiUrl } = environment;
    const payload = { articleTitle, imageUrl, placemment, articleContent };
    return this.http.post<Article>(`${apiUrl}/themes`, payload);
  }
}
