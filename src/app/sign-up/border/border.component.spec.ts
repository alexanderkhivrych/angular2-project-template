/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BorderComponent } from './border.component';

describe('BorderComponent', () => {
  let component: BorderComponent;
  let fixture: ComponentFixture<BorderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BorderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
