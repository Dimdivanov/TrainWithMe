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
    console.log('we are inside the add Article');

    console.log({ title, imageUrl, placement, articleContent });
  }
}
