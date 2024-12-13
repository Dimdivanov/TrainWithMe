import { Component } from '@angular/core';
import { StartNowComponent } from '../../shared/start-now/start-now.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [StartNowComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent {}
