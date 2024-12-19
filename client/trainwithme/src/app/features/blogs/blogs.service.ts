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
  //delete comment if owner
  deleteComment(themeId: string, postId: string) {
    return this.http.delete<void>(`/api/themes/${themeId}/posts/${postId}`, {});
  }
  //edit comment if owner
  editComment(themeId: string, postId: string) {
    const payload = { themeId, postId };
    return this.http.put<void>(
      `/api/themes/${themeId}/posts/${postId}`,
      payload
    );
  }
}
