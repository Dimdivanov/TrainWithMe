import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogsService } from '../blogs.service';
import { Theme } from '../../../types/post';
import { CommonModule, DatePipe } from '@angular/common';
import { BlogCommentComponent } from './blog-comment/blog-comment.component';

@Component({
  selector: 'app-blog-item',
  standalone: true,
  imports: [BlogCommentComponent, CommonModule],
  providers: [BlogsService, DatePipe],
  templateUrl: './blog-item.component.html',
  styleUrl: './blog-item.component.css',
})
export class BlogItemComponent implements OnInit {
  theme: Theme | null = null;
  latestThemes: Theme[] = [];

  formatDate: string | null = null;
  blogCreator: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogsService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['themeId'];

    this.blogService.getSingleBlog(id).subscribe((theme) => {
      this.theme = theme;
      this.formatDate = theme.created_at;
    });

    this.blogService.getThemes().subscribe((themes) => {
      this.latestThemes = themes.slice(-3);
    });
  }
  
  // Refresh blog data when a new comment is added or an existing one is deleted
  refreshBlogData(): void {
    const id = this.route.snapshot.params['themeId'];
    this.blogService.getSingleBlog(id).subscribe((theme) => {
      this.theme = theme;
      this.formatDate = theme.created_at;
    });
  }

  deleteComment(postId: string): void {
    const themeId = this.route.snapshot.params['themeId'];
    this.blogService.deleteComment(themeId, postId).subscribe();
  }
  editComment(postId: string, currentText: string): void {}
}
