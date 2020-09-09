import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeoDataService {
  apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {
  }
  getRegions(): any {
    return this.http.get(this.apiUrl + '/getRegions').pipe(catchError(this.handleError));
  }
  // tslint:disable-next-line:typedef
  getDistricts(regionId: number) {
    return this.http.get(this.apiUrl + '/getDistricts?regionId=' + regionId).pipe(catchError(this.handleError));
  }
  // tslint:disable-next-line:typedef
  getTownShips(districtId: number) {
    return this.http.get(this.apiUrl + '/getTownShips?districtId=' + districtId).pipe(catchError(this.handleError));
  }
  // tslint:disable-next-line:typedef
  getTowns(townShipId: number) {
    return this.http.get(this.apiUrl + '/getTowns?townShipId=' + townShipId).pipe(catchError(this.handleError));
  }
  // tslint:disable-next-line:typedef
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened. Please try again later.');
  }
}
