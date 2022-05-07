import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router'; 
import { Post } from './home';

@Injectable({
  providedIn: 'root'
})

export class HomeService { 
  constructor(
    private http: HttpClient,
    public router: Router
  ) {
  }
  // Get Posts
  getPosts(): Observable<Post[]> {
    let api = `https://jsonplaceholder.typicode.com/posts`;
    return this.http.get<Post[]>(`${api}?_sort=views&_order=desc`).pipe(
      map((res: Post[]) => {
        return res
      }),
      catchError(this.handleError)
    )
  }
  // Error
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}
