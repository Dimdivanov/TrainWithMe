import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Article } from '../../types/post';

@Injectable()
export class ArticleServiceService {
  constructor(private http: HttpClient) {}

  createArticle(themeName: string, postText: string, imageUrl: string) {
    const payload = { themeName, postText, imageUrl };
    console.log(payload);
    
    return this.http.post<Article>(`/api/themes`, payload);
  }
}
