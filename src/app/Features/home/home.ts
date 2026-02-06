import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home {
  constructor(private router: Router) {}

  navigateToCandidatePipeline() {
    //this.router.navigate(['/my-candidates']);
     const url = this.router.serializeUrl(this.router.createUrlTree(['/user']));
    window.open(location.origin + url, '_blank', 'noopener');
 
  }
}
