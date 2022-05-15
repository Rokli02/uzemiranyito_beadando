import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HandleWorkComponent } from './handle-work.component';

describe('HandleWorkComponent', () => {
  let component: HandleWorkComponent;
  let fixture: ComponentFixture<HandleWorkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HandleWorkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HandleWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
