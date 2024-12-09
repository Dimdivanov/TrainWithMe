import { Component, OnInit } from '@angular/core';
import { TrainerService } from './trainer.service';

@Component({
  selector: 'app-trainer',
  standalone: true,
  imports: [],
  providers: [TrainerService],
  templateUrl: './trainer.component.html',
  styleUrl: './trainer.component.css',
})
export class TrainerComponent implements OnInit {
  trainerUsers: any[] = [];
  constructor(private trainerService: TrainerService) {}
  ngOnInit(): void {
    this.fetchTrainers();
  }

  fetchTrainers() {
    this.trainerService.getAllTrainers().subscribe((data) => {
      console.log(data);
    });
  }
}
