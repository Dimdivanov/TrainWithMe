import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogsService } from '../blogs.service';
import { Theme } from '../../../types/post';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-blog-item',
  standalone: true,
  imports: [],
  providers: [BlogsService, DatePipe],
  templateUrl: './blog-item.component.html',
  styleUrl: './blog-item.component.css',
})
export class BlogItemComponent implements OnInit {
  theme: Theme | null = null;
  formatDate: string | null = null;
  createdBy: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogsService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['themeId'];
    this.blogService.getSingleBlog(id).subscribe((theme) => {
      this.theme = theme;
     

      if (this.theme?.created_at) {
        this.formatDate =
          this.datePipe.transform(
            this.theme.created_at,
            'yyyy-MM-dd HH:mm:ss'
          ) || '';
      }
      if (this.theme?.posts) {
        this.theme.posts.forEach((post) => {
          post.created_at =
            this.datePipe.transform(post.created_at, 'yyyy-MM-dd HH:mm:ss') ||
            '';
        });
      }
    });
  }
}
