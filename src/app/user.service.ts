/* tslint:disable:no-trailing-whitespace */
import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {IUser} from './users';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = 'http://127.0.0.1:8000/api/users';
  constructor(private http: HttpClient) { }
  // tslint:disable-next-line:typedef
  store(data): Observable<any> {
    return this.http.post(this.baseUrl, data)
      .pipe(
        retry(3),
        catchError(this.handleError)
    );
  }
  index(name, email): Observable<IUser[]> {
      return this.http.get<IUser[]>(this.baseUrl + '?name=' + name + '&email=' + email)
        .pipe(
          catchError(this.handleError)
        );
  }
    delete(id): Observable<any> {
      return this.http.get(this.baseUrl + '/delete?id=' + id)
        .pipe(
        catchError(this.handleError)
      );
    }
    getUser(id): Observable<any> {
      return this.http.get<any>(this.baseUrl + '?id=' + id)
        .pipe(
          catchError(this.handleError)
        );
  }
  update(data, id): Observable<any> {
    return this.http.put(this.baseUrl + '?id=' + id, data)
      .pipe(
        catchError(this.handleError)
      );
  }
  email(email, name): Observable<any> {
    return this.http.get(this.baseUrl + '/email?email=' + email + '&name=' + name)
      .pipe(
        catchError(this.handleError)
      );
  }

  // tslint:disable-next-line:typedef
  export(name, email) {
    return this.http.get(this.baseUrl + '/export?name=' + name + '&email=' + email, {
      responseType: 'arraybuffer'
    }).pipe(
      catchError(this.handleError)
    ).subscribe(response => {
      this.downloadFile(response, 'test/csv');
    });
  }


  // create a download link for the excel file and click it then remove it,
  // ultimately it will download the
  // tslint:disable-next-line:typedef
  downloadFile(data: any, type: string) {
    const fileName = 'file1.xlsx';
    const a = document.createElement('a');
    document.body.appendChild(a);
    const blob = new Blob([data], {type});
    a.href = window.URL.createObjectURL(blob);
    a.download = fileName;
    a.click();
    a.remove();
  }


  // tslint:disable-next-line:typedef
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // client-side or network error occurred
      console.error('An error occurred:', error.error.message);
    } else {
      // the backend returned unsuccessful response code
      // The response body may contain clues as to what went wrong
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`
      );
    }
    return throwError(
      'Something bad happened: please try again later.'
    );
  }
}
