import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Article } from '../../types/post';

@Injectable()
export class ArticleServiceService {
  constructor(private http: HttpClient) {}

  createArticle(
    themeName: string,
    postText: string,
    imageUrl: string,
    articleData: string
  ) {
    const payload = { themeName, postText, imageUrl, articleData };
    return this.http.post<Article>(`/api/themes`, payload);
  }
  editArticle(themeId: string) {
    return this.http.get<Article>(`/api/${themeId}`);
  }
}
