import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private http: HttpClient) {}

  //Post a comment in Theme
  commentPost(themeId: string, text: string) {
    const payload = { postText: text };
    return this.http.post(`/api/themes/${themeId}`, payload);
  }
}
