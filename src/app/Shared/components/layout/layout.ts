import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';



@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './layout.html',
  styleUrls: ['./layout.css'],
  encapsulation: ViewEncapsulation.None,
})
export class Layout {
  isDropdownOpen = false;

username = 'Usha Yadav';
role = 'UI Developer';

toggleDropdown() {
  this.isDropdownOpen = !this.isDropdownOpen;
}

logout() {
  alert('Logged out!');
}


}
