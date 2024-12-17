import { Component, OnInit } from '@angular/core';
import { TrainerService } from './trainer.service';
import { TrainerFound, User } from '../../types/post';
import { RouterLink } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-trainer',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  providers: [TrainerService],
  templateUrl: './trainer.component.html',
  styleUrl: './trainer.component.css',
})
export class TrainerComponent implements OnInit {
  trainerUsers: User[] = [];
  trainerFound: TrainerFound | null = null;

  searchForm = new FormGroup({
    searchTerm: new FormControl('', [Validators.required]),
  });

  constructor(private trainerService: TrainerService) {}

  ngOnInit(): void {
    this.fetchTrainers();
  }
  //to do complete error too
  fetchTrainers() {
    this.trainerService.getAllTrainers().subscribe({
      next: (data) => {
        this.trainerUsers = data;
      },
    });
  }
  onSearch(): void {
    const searchValue = this.searchForm
      .get<string>('searchTerm')
      ?.value.toLowerCase();

    this.trainerService.searchTrainer(searchValue).subscribe({
      next: (data) => {
        this.trainerFound = data;
      },
      error: (err) => {
        console.error('Error fetching trainers:', err);
      },
    });
  }
}
