import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommentService } from './comment.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-blog-comment',
  standalone: true,
  imports: [ReactiveFormsModule],
  providers: [CommentService],
  templateUrl: './blog-comment.component.html',
  styleUrl: './blog-comment.component.css',
})
export class BlogCommentComponent {
  @Output() commentAdded = new EventEmitter<void>();

  commentForm = new FormGroup({
    text: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(200),
    ]),
  });
  constructor(
    private commentService: CommentService,
    private route: ActivatedRoute
  ) {}

  onCommentSubmit() {
    if (this.commentForm.invalid) {
      return;
    }

    const text = this.commentForm.get('text')?.value ?? '';
    const themeId = this.route.snapshot.params['themeId'];

    this.commentService.commentPost(themeId, text).subscribe({
      next: () => {
        this.commentForm.reset();
        this.commentAdded.emit();
      },
      error: (err) => {
        console.error('Error posting comment:', err);
      },
    });
  }
}
