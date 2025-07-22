import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Email } from '../models/email';

@Component({
  selector: 'app-email-list-item',
  imports: [CommonModule],
  templateUrl: './email-list-item.html',
  styleUrl: './email-list-item.css'
})
export class EmailListItem {
  @Input() avatarUrl!: string;
  @Input() sender!: string;
  @Input() date!: string;
  @Input() subject!: string;
  @Input() snippet!: string;
  @Input() attachmentsCount?: number;
  @Input() isActive: boolean = false;
  @Output() emailSelected = new EventEmitter<Email>();
  @Input() email: any;
  onClick() {
    this.isActive = false;
    this.emailSelected.emit(this.email);
  }
}
