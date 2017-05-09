import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { SessionService } from './session.service';
import { User } from '../_models/user';

import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';

@Injectable()
export class ApiRequestService {
  api_endpoint: string;
  api_token: string;
  basic_auth: string;

  constructor(
    private http: Http,
    private session: SessionService
  ) {
    this.api_endpoint = 'http://128.199.49.54/api/v1';
  }

  private addAuthHeaders(headers: Headers, isContentType: boolean = true) {
    headers.append('Accept', 'application/json');
    if(isContentType) {
      headers.append('Content-Type', 'application/json');
    }
    if(this.session.isUserSignedIn() && this.session.current_user.token) {
      headers.append('Authorization', 'Token ' + this.session.current_user.token);
    }
  }

  private makeLink(method: string): string {
    let query: string;
    [method, query] = method.split('?');
    return `${this.api_endpoint}/${method}/` + ((query != null) ? `?${query}` : '');
  }

  get<T>(api_method: string): Observable<T> {
    const headers = new Headers();
    this.addAuthHeaders(headers);
    return this.http.get(this.makeLink(api_method), {
      headers: headers
    }).catch(this.handleError).map<Response, T>((response: Response) => response.json());
  }
  getSlash<T>(method: string): Observable<T> {
    const headers = new Headers();
    this.addAuthHeaders(headers);
    return this.http.get(`${this.api_endpoint}/${method}/`, {
      headers: headers
    }).catch(this.handleError).map<Response, T>((response: Response) => response.json());
  }
  post(api_method: string, data: any, isContentType: boolean = true) {
    let headers = new Headers();
    this.addAuthHeaders(headers, isContentType);
    return this.http.post(this.makeLink(api_method), data, {
      headers: headers
    }).catch(this.handleError).map((response: Response) => response.json());
  }

  put(api_method: string, data: any) {
    const headers = new Headers();
    this.addAuthHeaders(headers);
    return this.http.put(this.makeLink(api_method), data, {
      headers: headers
    }).catch(this.handleError).map((response: Response) => response.json());
  }

  patch(api_method: string, data: any) {
    const headers = new Headers();
    this.addAuthHeaders(headers);
    return this.http.patch(this.makeLink(api_method), data, {
      headers: headers
    }).catch(this.handleError).map((response: Response) => response.json());
  }

  delete(api_method: string) {
    const headers = new Headers();
    this.addAuthHeaders(headers);
    return this.http.delete(this.makeLink(api_method), {
      headers: headers
    }).catch(this.handleError).map((response: Response) => response.json());
  }

  private handleError(error: any): Promise<any> {
    let errorData;
    if (error && error.status >= 500) {
      errorData = {'detail': 'internal server error'}
    } else if (error && error.json != null && typeof(error.json) == 'function') {
      errorData = error.json()
    } else {
      errorData = error
    }
    return Promise.reject(errorData);
  }
}
