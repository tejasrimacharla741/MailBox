import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-email-details',
  imports: [CommonModule],
  templateUrl: './email-details.html',
  styleUrl: './email-details.css'
})
export class EmailDetails {
  @Input() senderName!: string;
  @Input() senderEmail!: string;
  @Input() date!: string;
  @Input() avatarUrl!: string;
  @Input() subject!: string;
  @Input() body!: string;
  @Input() attachments!: { url: string, alt: string }[];
}
