import { Component, OnInit } from '@angular/core';
import { BlogsService } from './blogs.service';

@Component({
  selector: 'app-blogs',
  standalone: true,
  imports: [],
  providers: [BlogsService],
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.css',
})
export class BlogsComponent implements OnInit {
  items: any[] = [];
  constructor(private blogsService: BlogsService) {}
  ngOnInit(): void {
    this.fetchItems();
  }

  fetchItems(): void {
    this.blogsService.getAll().subscribe((data) => {
      console.log(data);
      this.items.push(data);
    });
  }
}
