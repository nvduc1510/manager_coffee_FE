import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterScriptsComponent } from './footer-scripts.component';

describe('FooterScriptsComponent', () => {
  let component: FooterScriptsComponent;
  let fixture: ComponentFixture<FooterScriptsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterScriptsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FooterScriptsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
