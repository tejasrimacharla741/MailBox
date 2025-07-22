import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailListItem } from './email-list-item';

describe('EmailListItem', () => {
  let component: EmailListItem;
  let fixture: ComponentFixture<EmailListItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmailListItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailListItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
