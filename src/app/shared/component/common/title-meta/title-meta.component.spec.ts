import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleMetaComponent } from './title-meta.component';

describe('TitleMetaComponent', () => {
  let component: TitleMetaComponent;
  let fixture: ComponentFixture<TitleMetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TitleMetaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TitleMetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
