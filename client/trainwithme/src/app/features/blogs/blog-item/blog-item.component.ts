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
  blogCreator: string | null = null;

  latestThemes: Theme[] = [];

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogsService
  ) {}

  // find the user created the article
  
  //to do
  ngOnInit(): void {
    const id = this.route.snapshot.params['themeId'];
    this.blogService.getSingleBlog(id).subscribe((theme) => {
      this.theme = theme;
      this.formatDate = theme.created_at;
      console.log(this.theme);
    });

    this.blogService.getThemes().subscribe((themes) => {
      this.latestThemes = themes.slice(-3);
    });
  }
}
