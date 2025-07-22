import { Component, signal } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
import { UserProfileCard } from './user-profile-card/user-profile-card';

@Component({
  selector: 'app-root',
  imports: [UserProfileCard],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('mail-box-app');
}
