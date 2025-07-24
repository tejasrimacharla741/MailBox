import { Component } from '@angular/core';
import { ComposeService } from './compose-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-compose-mail',
  imports: [CommonModule],
  templateUrl: './compose-mail.html',
  styleUrl: './compose-mail.scss'
})
export class ComposeMailComponent {
  public isOpen = false;

  constructor(private composeService: ComposeService) {
    this.composeService.isComposeOpen$.subscribe((val) => {
      this.isOpen = val;
    });
  }

  close() {
    this.composeService.close();
  }
}
