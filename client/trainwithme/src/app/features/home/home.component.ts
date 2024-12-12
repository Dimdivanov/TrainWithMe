import { Component } from '@angular/core';
import { HeroSectionComponent } from './hero-section/hero-section.component';
import { BlogPostsSectionComponent } from './blog-posts-section/blog-posts-section.component';
import { WelcomeMsgComponent } from '../../shared/welcome-msg/welcome-msg.component';

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
export class HomeComponent {}
