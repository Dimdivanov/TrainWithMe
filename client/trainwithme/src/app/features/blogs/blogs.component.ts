import { Component, OnInit } from '@angular/core';
import { BlogsService } from './blogs.service';
import { Theme } from '../../types/post';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-blogs',
  standalone: true,
  imports: [LoaderComponent, RouterLink],
  providers: [BlogsService],
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.css',
})
export class BlogsComponent implements OnInit {
  blogs: Theme[] = [];

  //testing loader
  isLoading = true;

  constructor(private blogsService: BlogsService) {}
  ngOnInit(): void {
    this.fetchItems();
    //testing loader - remove the timeout to stop the example
    this.isLoading = false;
  }

  fetchItems(): void {
    this.blogsService.getAll().subscribe((data) => {
      this.blogs = data;
    });
  }
}
