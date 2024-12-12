import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-welcome-msg',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './welcome-msg.component.html',
  styleUrl: './welcome-msg.component.css'
})
export class WelcomeMsgComponent {

}
