import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class InventoryService {
  serverUrl = 'http://localhost:3000';
  errorData: {};
  userDetails = JSON.parse(localStorage.getItem('currentUser'));
  constructor(private http: HttpClient) { }

  redirectUrl: string;

create(productData) {
  productData["created_by"] = this.userDetails["username"];
  productData["orgID"] = this.userDetails["orgID"];

  return this.http.post<any>(`${this.serverUrl}/product/create`, productData)
  .pipe(
    catchError(this.handleError)
  );
}

fetch() {
  // productData["created_by"] = this.userDetails["username"];
  // productData["orgID"] = this.userDetails["orgID"];

  return this.http.get<any>(`${this.serverUrl}/product/fetch`)
  .pipe(
    catchError(this.handleError)
  );
} 

fetchByID(id) {
  // productData["created_by"] = this.userDetails["username"];
  // productData["orgID"] = this.userDetails["orgID"];
  return this.http.get<any>(`${this.serverUrl}/product/fetch/${id}`)
  .pipe(
    catchError(this.handleError)
  );
} 

update(productData) {
  productData["created_by"] = this.userDetails["username"];
  productData["orgID"] = this.userDetails["orgID"];

  return this.http.post<any>(`${this.serverUrl}/product/update`, productData)
  .pipe(
    catchError(this.handleError)
  );
}

delete(ids) {
  return this.http.post<any>(`${this.serverUrl}/product/delete`, ids)
  .pipe(
    catchError(this.handleError)
  );
}
private handleError(error: HttpErrorResponse) {
  if (error.error instanceof ErrorEvent) {

    // A client-side or network error occurred. Handle it accordingly.
    console.error('An error occurred:', error.error.message);
  } else {

    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong.
    console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
  }

  // return an observable with a user-facing error message
  this.errorData = {
    errorTitle: 'Oops! Request for document failed',
    errorDesc: 'Something bad happened. Please try again later.'
  };
  return throwError(this.errorData);
}

}
