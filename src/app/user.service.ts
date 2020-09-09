import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = 'http://127.0.0.1:8000/api/users';
  constructor(private http: HttpClient) { }
  // tslint:disable-next-line:typedef
  store(data): Observable<any> {
    return this.http.post(this.baseUrl, data);
  }
  index(name, email): Observable<any> {
    return this.http.get(this.baseUrl + '?name=' + name + '&email=' + email);
  }
  delete(id): Observable<any> {
    return this.http.get(this.baseUrl + '/delete?id=' + id);
  }
  getUser(id): Observable<any> {
    return this.http.get(this.baseUrl + '?id=' + id);
  }
  update(data, id): Observable<any> {
    return this.http.put(this.baseUrl + '?id=' + id, data);
  }
}
