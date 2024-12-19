import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogsService } from '../blogs.service';
import { Theme } from '../../../types/post';
import { CommonModule, DatePipe } from '@angular/common';
import { BlogCommentComponent } from './blog-comment/blog-comment.component';
import { Subject, takeUntil } from 'rxjs';

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

  //for handling unsubbing
  private unsubscribe$: Subject<void> = new Subject();

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogsService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['themeId'];

    this.blogService
      .getSingleBlog(id)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((theme) => {
        this.theme = theme;
        this.formatDate = theme.created_at;
      });

    this.blogService
      .getThemes()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((themes) => {
        this.latestThemes = themes.slice(-3);
      });
  }

  // Refresh blog data when a new comment is added or an existing one is deleted
  refreshBlogData(): void {
    const id = this.route.snapshot.params['themeId'];
    this.blogService
      .getSingleBlog(id)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((theme) => {
        this.theme = theme;
        this.formatDate = theme.created_at;
      });
  }

  deleteComment(postId: string): void {
    const themeId = this.route.snapshot.params['themeId'];
    this.blogService.deleteComment(themeId, postId).subscribe(() => {
      this.refreshBlogData();
    });
  }
  editComment(postId: string, currentText: string): void {}
  // On component destroy, emit value to complete the observables
  ngOnDestroy(): void {
    this.unsubscribe$.next(); // Emit value to unsubscribe
    this.unsubscribe$.complete(); // Complete the subject
  }
}
