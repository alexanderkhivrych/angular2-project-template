export class Event {
  title: string = '';
  description: string = '';
  site_url: string = '';
  datetime_end: string;
  datetime_start: string;
  deleted_date: string;
  publicly_visibile: boolean = false;


  constructor(params: any = {}) {
    for (let key in params) {
      this[key] = params[key]
    }
  }
}
