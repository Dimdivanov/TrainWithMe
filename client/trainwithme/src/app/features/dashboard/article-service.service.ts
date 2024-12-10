import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments.development';
import { Article } from '../../types/post';

@Injectable()
export class ArticleServiceService {
  constructor(private http: HttpClient) {}
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
