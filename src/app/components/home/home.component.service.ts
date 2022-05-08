import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Post } from './home';
import { StateService } from '../../shared/service/state.service';



interface HomeState {
  postList: any;
}

const initialState: HomeState = {
  postList: []
};
@Injectable({
  providedIn: 'root'
})

export class HomeService extends StateService<HomeState> {
  postList$: Observable<Post[]> = this.select(state => state.postList);

  constructor(
    private http: HttpClient,
    public router: Router
  ) {
    super(initialState);

  }
  private setPostListState(data: Post[]) {
    this.setState({
      postList: [...this.state.postList, data]
    });
  }

  getPosts(){
    let api = `https://jsonplaceholder.typicode.com/posts`;
    return this.http.get<Post[]>(`${api}?_sort=views&_order=desc`).pipe(
      map((res: Post[]) => {
        this.setPostListState(res);
        return res;
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
