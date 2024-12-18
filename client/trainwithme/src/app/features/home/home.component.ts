import { Component, OnInit } from '@angular/core';
import { HeroSectionComponent } from './hero-section/hero-section.component';
import { BlogPostsSectionComponent } from './blog-posts-section/blog-posts-section.component';
import { WelcomeMsgComponent } from '../../shared/welcome-msg/welcome-msg.component';
import { HomeSectionService } from './home-section.service';
import { Theme } from '../../types/post';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroSectionComponent,
    WelcomeMsgComponent,
    BlogPostsSectionComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  themes: Theme[] = [];

  constructor(private homeService: HomeSectionService) {}

  ngOnInit(): void {
    this.homeService.getPosts().subscribe((themes) => {
      this.themes = themes;
    });
  }
}
