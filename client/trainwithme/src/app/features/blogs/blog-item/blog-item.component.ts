import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogsService } from '../blogs.service';
import { Theme } from '../../../types/post';
import { CommonModule, DatePipe, TitleCasePipe } from '@angular/common';
import { BlogCommentComponent } from './blog-comment/blog-comment.component';
import { Subject, takeUntil } from 'rxjs';
import { UserServiceService } from '../../auth/service/user-service.service';

@Component({
  selector: 'app-blog-item',
  standalone: true,
  imports: [BlogCommentComponent, CommonModule, TitleCasePipe, DatePipe],
  providers: [BlogsService, DatePipe],
  templateUrl: './blog-item.component.html',
  styleUrl: './blog-item.component.css',
})
export class BlogItemComponent implements OnInit, OnDestroy {
  theme: Theme | null = null;
  latestThemes: Theme[] = [];
  formatDate: string | null = null;
  blogCreator: string | null = null;
  isUserLoggedIn: boolean = false; 

  isUserOwner: boolean = false; 

  private unsubscribe$: Subject<void> = new Subject();

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogsService,
    private userService: UserServiceService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['themeId'];
    // Check if the user is logged in
    this.isUserLoggedIn = this.userService.isLogged;

    // Check if the logged-in user is the owner of the theme

    this.blogService
      .getSingleBlog(id)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((theme) => {
        this.theme = theme;
        this.formatDate = theme.created_at;
        if (this.theme?.userId) {
          this.isUserOwner = this.userService.getUserId(theme.userId._id);
        }
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

  //not completed
  editComment(postId: string, currentText: string): void {
    const themeId = this.route.snapshot.params['themeId'];
    this.blogService.editComment(postId, currentText).subscribe(() => {
      this.refreshBlogData();
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
