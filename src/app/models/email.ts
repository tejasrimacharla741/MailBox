export interface Email {
  avatarUrl: string;
  sender: string;
  date: string;
  subject: string;
  snippet: string;
  isRead?: boolean;
  attachmentsCount?: number;
}

export interface Attachment {
  url: string;
  name?: string;
  alt?: string;
}

export interface Email {
  avatarUrl: string;
  sender: string;
  senderEmail: string;
  date: string;
  subject: string;
  snippet: string;
  body: string;
  attachmentsCount?: number;  // no modifiers like public/private
  attachments?: Attachment[];
}