import { Injectable } from '@angular/core';
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
  getPosts() {
    let api = `https://jsonplaceholder.typicode.com/posts`;
    return this.http.get(`${api}?_sort=views&_order=desc`).pipe(
      (res) => {
        return res;
      });
  }

}
