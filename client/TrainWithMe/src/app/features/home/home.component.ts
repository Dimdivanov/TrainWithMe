import { Component } from '@angular/core';
import { HeroSectionComponent } from "./hero-section/hero-section.component";
import { AdSectionComponent } from "./ad-section/ad-section.component";
import { TrainerTypeSectionComponent } from "./trainer-type-section/trainer-type-section.component";
import { CreatorsSectionComponent } from "./creators-section/creators-section.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroSectionComponent, AdSectionComponent, TrainerTypeSectionComponent, CreatorsSectionComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
