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
    postText: new FormControl('', [Validators.required]),
    imageUrl: new FormControl('', [Validators.required]),
  });
  constructor(
    private articleService: ArticleServiceService,
    private router: Router
  ) {}

  postArticle() {
    const { themeName, postText, imageUrl } = this.addArticleForm.value;

    if (this.addArticleForm.invalid) {
      return;
    }

    if (this.addArticleForm.valid) {
      this.articleService
        .createArticle(themeName!, postText!, imageUrl!)
        .subscribe(() => this.router.navigate(['/blogs']));
    }
  }
}
