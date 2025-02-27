import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ArticleServiceService } from '../article-service.service';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-article-edit',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  providers: [ArticleServiceService],
  templateUrl: './article-edit.component.html',
  styleUrl: './article-edit.component.css',
})
export class ArticleEditComponent implements OnInit {
  articleId: string | null = '';

  editArticleForm = new FormGroup({
    themeName: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    postText: new FormControl(''),
    imageUrl: new FormControl('', [Validators.required]),
    articleData: new FormControl('', [Validators.required]),
  });

  constructor(
    private articleService: ArticleServiceService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (this.editArticleForm.invalid) {
      return;
    }
    const themeId = this.route.snapshot.params['themeId'];
    this.articleService.editArticle(themeId).subscribe({
      next: (data) => {
        console.log(data);
      },
    });
  }

  editArticle() {}
}
