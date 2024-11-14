import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderCssComponent } from './header-css.component';

describe('HeaderCssComponent', () => {
  let component: HeaderCssComponent;
  let fixture: ComponentFixture<HeaderCssComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderCssComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderCssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
