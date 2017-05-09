import { Component, Output, EventEmitter, ViewChild } from '@angular/core';
import { UsersService, MailsService } from '../../../_services/index';
import { Select2OptionData } from 'ng2-select2';
import { NgForm } from '@angular/forms';
import { Message } from '../../../_models/message';
import { Modal } from 'ng2-modal';
import * as JQuery from 'jquery'
@Component({
  selector: 'app-messages-form',
  templateUrl: './messageForm.component.html',
  styleUrls: ['./messageForm.component.css'],
})
export class MessageFormComponent implements Component {
  @ViewChild('messageModal')
  modal: Modal;
  model: any = {};
  errors: any = null;
  recipientId: number;
  neighborList: Array<Select2OptionData>;
  @Output() messageCreated = new EventEmitter();

  constructor (private users: UsersService, private mails: MailsService) {
    users.getList().subscribe((data) => {
      if (Array.isArray(data) && data.length) {
        this.neighborList = data.map(item => ({ id: item.id, image: item.avatar_url, text: item.formatted_name }));
      }
    });
  }

  open () {
    this.modal.open();
  }

  close () {
    this.modal.close();
  }

  resetForm (ngForm: NgForm) {
    this.close();
    ngForm.form.reset();
  }

  onSubmit (ngForm: NgForm, event: Event) {
    event.preventDefault();
    if (!ngForm.form.valid) {
      return;
    }
    this.errors = null;
    const message = new Message({
      text: this.model.text,
      recipient: this.model.recipientId,
      subject: this.model.subject,
    });
    this.mails.send({ recipient: message.recipient, text: message.text }).subscribe(() => {
        this.messageCreated.emit();
        ngForm.resetForm();
        this.close();

      },
      error => {
        this.errors = error;
        ngForm.form.markAsUntouched();
      });
  }

  templateResult (state): JQuery | string {
    if (!state.id) {
      return state.text;
    }
    const img = state.image || '/assets/images/user_icon.png';
    return JQuery(`<span class="select_image"><img src="${img}" class="img_user"> ${state.text}</span>`);
  }

  onChangRecipient (e: any) {
    this.model.recipientId = e.value;
  }
}
