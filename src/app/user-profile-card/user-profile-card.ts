import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Email } from '../models/email';
import { EmailListItem } from '../email-list-item/email-list-item';
import { EmailDetails } from '../email-details/email-details';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ComposeService } from '../compose-mail/compose-service';
import { ComposeMailComponent } from '../compose-mail/compose-mail';

@Component({
  selector: 'app-user-profile-card',
  standalone: true,
  imports: [CommonModule, EmailListItem, EmailDetails, FormsModule, ComposeMailComponent],
  templateUrl: './user-profile-card.html',
  styleUrl: './user-profile-card.scss'
})
export class UserProfileCard {
  selectedEmail: Email | null = null;
  activePage: string = 'Inbox';
  emails: Email[] = [];
  inboxCount: number = 0;
  searchTerm: string = '';
  allRecords: Email[] = [];
  showSidebar: boolean = false;
  isMobileView: boolean = false;
  hide: boolean = false;

  constructor(private http: HttpClient, private composeService: ComposeService) { }

  ngOnInit(): void {
    this.http.get<Email[]>('assets/data/emails.json')
      .subscribe((data) => {
        this.allRecords = this.emails = data;
        this.inboxCount = data.filter(email => email.isRead).length;
        if (this.emails.length > 0 && !this.isMobileView) {
          this.selectedEmail = this.emails[0];
          this.selectedEmail.isRead = false;
          this.inboxCount--;
        }
      });
    this.checkScreenSize();
  }

  toggleSidebar() {
    if(this.activePage == 'Inbox')
      this.hide = false;
    this.showSidebar = !this.showSidebar;
  }

  setActivePage(page: string) {
    this.activePage = page;
    if (window.innerWidth <= 768) {
      this.showSidebar = false;
    }
  }

  checkScreenSize() {
    this.isMobileView = window.innerWidth <= 768;
  }
  @HostListener('window:resize')
  onResize() {
    this.checkScreenSize();
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

  onEmailSelected(email: Email) {
    if (this.activePage === 'Inbox' && email.isRead) {
      this.inboxCount--;
      email.isRead = false;
    }
    if (window.innerWidth <= 768) {
      this.showSidebar = false;
      this.isMobileView = true;
      this.hide = true;
    }
    this.selectedEmail = email;
  }
  onSearchChange() {
    const term = this.searchTerm.toLowerCase();

    if (!this.searchTerm || this.searchTerm.trim() === '') {
      this.emails = [...this.allRecords];
    }
    else {
      this.emails = this.emails.filter(email =>
        email.sender.toLowerCase().includes(term) ||
        email.subject.toLowerCase().includes(term) ||
        email.snippet.toLowerCase().includes(term)
      );
    }
  }
  openCompose() {
    this.composeService.open();
  }
  onBackToList(){
    this.hide = false;
    this.selectedEmail = null;
  }
}