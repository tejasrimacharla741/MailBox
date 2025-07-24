import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-email-details',
  imports: [CommonModule],
  templateUrl: './email-details.html',
  styleUrl: './email-details.scss'
})
export class EmailDetails {
  @Input() senderName!: string;
  @Input() senderEmail!: string;
  @Input() date!: string;
  @Input() avatarUrl!: string;
  @Input() subject!: string;
  @Input() body!: string;
  @Input() attachments!: { url: string, alt: string }[];
  @Output() backToList = new EventEmitter<void>();
  isMobileView: boolean = false;

  ngOnInit() {
    this.checkScreenSize();
  }

  @HostListener('window:resize')
  onResize() {
    this.checkScreenSize();
  }
  onBack() {
    this.backToList.emit();
  }

  checkScreenSize() {
    this.isMobileView = window.innerWidth <= 768;
  }

  downloadAllAttachments() {
    this.attachments.forEach((att: { url: string, alt: string }) => {
      this.downloadFile(att.url, att.alt || 'attachment');
    });
  }

  downloadFile(fileUrl: string, fileName: string) {
    const anchor = document.createElement('a');
    anchor.href = fileUrl;
    anchor.download = fileName;
    anchor.target = '_blank';
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  }
}
