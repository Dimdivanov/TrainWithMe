import { Component, OnInit } from '@angular/core';
import { HeroSectionComponent } from './hero-section/hero-section.component';
import { WelcomeMsgComponent } from '../../shared/welcome-msg/welcome-msg.component';
import { HomeSectionService } from './home-section.service';
import { Theme } from '../../types/post';
import { StartNowComponent } from '../../shared/start-now/start-now.component';
import { BlogsComponent } from '../blogs/blogs.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroSectionComponent,
    WelcomeMsgComponent,
    StartNowComponent,
    BlogsComponent,
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
