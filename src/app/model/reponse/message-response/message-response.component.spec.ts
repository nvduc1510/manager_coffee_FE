import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageResponseComponent } from './message-response.component';

describe('MessageResponseComponent', () => {
  let component: MessageResponseComponent;
  let fixture: ComponentFixture<MessageResponseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessageResponseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MessageResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
