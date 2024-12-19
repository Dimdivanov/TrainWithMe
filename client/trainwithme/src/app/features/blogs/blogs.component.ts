import { Component, OnDestroy, OnInit } from '@angular/core';
import { BlogsService } from './blogs.service';
import { Theme } from '../../types/post';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { RouterLink } from '@angular/router';
import { MousehoverDirective } from '../../directives/mousehover.directive';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-blogs',
  standalone: true,
  imports: [LoaderComponent, RouterLink, MousehoverDirective],
  providers: [BlogsService],
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.css',
})
export class BlogsComponent implements OnInit, OnDestroy {
  blogs: Theme[] = [];
  private subscription: Subscription = new Subscription();
  //testing loader
  isLoading = true;

  constructor(private blogsService: BlogsService) {}
  ngOnInit(): void {
    this.fetchItems();
    this.isLoading = false;
  }
 
  fetchItems(): void {
    const blogsSubscription = this.blogsService.getAll().subscribe((data) => {
      this.blogs = data;
    });
    this.subscription.add(blogsSubscription);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
