import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ArticleServiceService } from '../article-service.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-article-create',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  providers: [ArticleServiceService],
  templateUrl: './article-create.component.html',
  styleUrl: './article-create.component.css',
})
export class ArticleCreateComponent {
  addArticleForm = new FormGroup({
    themeName: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    imageUrl: new FormControl('', [Validators.required]),
    placement: new FormControl('', [Validators.required]),
    articleContent: new FormControl('', [
      Validators.required,
      Validators.maxLength(500),
    ]),
  });
  constructor(
    private articleService: ArticleServiceService,
    private router: Router
  ) {}

  postArticle() {
    const { themeName, imageUrl, placement, articleContent } =
      this.addArticleForm.value;
    console.log(this.addArticleForm.value);

    if (this.addArticleForm.invalid) {
      return;
    }

    if (this.addArticleForm.valid) {
      this.articleService
        .createArticle(themeName!, imageUrl!, placement!, articleContent!)
        .subscribe(() => this.router.navigate(['/blogs']));
    }
  }
}
