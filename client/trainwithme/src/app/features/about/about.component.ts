import { Component } from '@angular/core';
import { StartNowComponent } from '../../shared/start-now/start-now.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [StartNowComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {

}
