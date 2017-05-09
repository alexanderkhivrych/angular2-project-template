/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { FileUploader } from './fileUploader.component';

describe('FileUploader', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        FileUploader
      ],
    });
    TestBed.compileComponents();
  });

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(FileUploader);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
