import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Fullscreen1Component } from './fullscreen1.component';

describe('Fullscreen1Component', () => {
  let component: Fullscreen1Component;
  let fixture: ComponentFixture<Fullscreen1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Fullscreen1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Fullscreen1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
