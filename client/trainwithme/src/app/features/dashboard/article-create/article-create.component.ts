import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ArticleServiceService } from '../article-service.service';

@Component({
  selector: 'app-article-create',
  standalone: true,
  imports: [RouterLink],
  providers: [ArticleServiceService],
  templateUrl: './article-create.component.html',
  styleUrl: './article-create.component.css',
})
export class ArticleCreateComponent {
  constructor(private articleService: ArticleServiceService) {}

  addArticle(
    event: Event,
    title: string,
    imageUrl: string,
    placement: string,
    articleContent: string
  ) {
    event.preventDefault();
    //creating an article when JWT injected and intercepted request
    console.log({ title, imageUrl, placement, articleContent });
    this.articleService
      .createArticle(title, imageUrl, placement, articleContent)
      .subscribe((data) => console.log(data));
  }
}
