import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestionsHeaderComponent } from './suggestions-header.component';

describe('SuggestionsHeaderComponent', () => {
  let component: SuggestionsHeaderComponent;
  let fixture: ComponentFixture<SuggestionsHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuggestionsHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuggestionsHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
