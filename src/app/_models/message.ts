

export class Message {
  recipient: number;
  text: string;
  subject: string; //It is in design, but no such field in api

  public update(params: any = {}) {
    for (let key in params) {
      this[key] = params[key];
    }
  }

  constructor(params: any = {}) {
    this.update(params);
  }
}
