import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Email } from '../models/email';
import { EmailListItem } from '../email-list-item/email-list-item';
import { EmailDetails } from '../email-details/email-details';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-profile-card',
  standalone: true,
  imports: [CommonModule, EmailListItem, EmailDetails],
  templateUrl: './user-profile-card.html',
  styleUrl: './user-profile-card.css'
})
export class UserProfileCard {
  selectedEmail?: Email;
  activePage: string = 'Inbox';
  emails: Email[] = [];
  inboxCount: number = 20;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<Email[]>('assets/data/emails.json')
      .subscribe((data) => {
        this.emails = data;
      });
  }

  selectEmail(email: Email): void {
    this.selectedEmail = email;
  }

  get mappedAttachments(): { url: string; alt: string }[] {
    return (this.selectedEmail?.attachments || []).map(att => ({
      url: att.url,
      alt: att.name || ''
    }));
  }

  setActivePage(page: string) {
    this.activePage = page;
  }

  onEmailSelected(email: Email) {
    if (this.activePage === 'Inbox' && !email.isRead) {
      this.inboxCount--;
      email.isRead = true;
    }
    this.selectedEmail = email;
  }
}