import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplayCommandsComponent } from './replay-commands.component';

describe('ReplayCommandsComponent', () => {
  let component: ReplayCommandsComponent;
  let fixture: ComponentFixture<ReplayCommandsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReplayCommandsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReplayCommandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
