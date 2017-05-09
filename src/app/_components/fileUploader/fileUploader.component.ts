import { Component, Input, EventEmitter, Output } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'file-uploader',
  templateUrl: './fileUploader.component.html',
  styleUrls: ['./fileUploader.component.css']
})
export class FileUploader implements Component {
  @Input() public id: string;
  @Input() public type: string;
  @Output() onChange = new EventEmitter();

  ngOnInit() {
    $(`#${this.id}`).find('input').on('change', () => {
      this.onChange.emit();
    });
}
  public getFiles() {
    const fileInput: any = $(`#${this.id}`).find('input')[0];
    return fileInput.files;
  }

  public reset() {
    $(`#${this.id}`).find('input').val('');
  }
}
