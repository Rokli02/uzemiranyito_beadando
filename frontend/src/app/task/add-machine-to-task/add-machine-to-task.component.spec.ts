import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMachineToTaskComponent } from './add-machine-to-task.component';

describe('AddMachineToTaskComponent', () => {
  let component: AddMachineToTaskComponent;
  let fixture: ComponentFixture<AddMachineToTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMachineToTaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMachineToTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
