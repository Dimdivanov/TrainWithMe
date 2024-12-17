import { Component, OnInit } from '@angular/core';
import { HomeSectionService } from '../home-section.service';
import { Theme } from '../../../types/post';
import { TruncatePipe } from './truncate.pipe';

@Component({
  selector: 'app-blog-posts-section',
  standalone: true,
  imports: [TruncatePipe],
  providers: [HomeSectionService],
  templateUrl: './blog-posts-section.component.html',
  styleUrl: './blog-posts-section.component.css',
})
export class BlogPostsSectionComponent implements OnInit {
  themes: Theme[] = [];

  constructor(private homeService: HomeSectionService) {}

  ngOnInit(): void {
    this.homeService.getPosts(3).subscribe((themes) => {
      this.themes = themes.slice(-3);
    });
  }
}
