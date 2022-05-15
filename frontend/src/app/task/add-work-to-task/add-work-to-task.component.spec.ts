import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWorkToTaskComponent } from './add-work-to-task.component';

describe('AddWorkToTaskComponent', () => {
  let component: AddWorkToTaskComponent;
  let fixture: ComponentFixture<AddWorkToTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddWorkToTaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddWorkToTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
