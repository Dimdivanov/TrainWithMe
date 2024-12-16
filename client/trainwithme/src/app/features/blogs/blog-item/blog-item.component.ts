import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogsService } from '../blogs.service';
import { Theme } from '../../../types/post';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-blog-item',
  standalone: true,
  imports: [CommonModule],
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
      this.formatDate = this.theme?.created_at;
    });
  }
}
