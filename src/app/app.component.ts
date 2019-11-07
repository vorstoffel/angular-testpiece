import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap, mergeMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User } from './models/user.model';
import { Post } from './models/post.model';
import { Userpost } from './models/userpost.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  usersURL = 'https://jsonplaceholder.typicode.com/users';
  postsURL = 'https://jsonplaceholder.typicode.com/posts';

  users$: Observable<User[]>;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.users$ = this.getEvenUsers();
  }

  getEvenUsers(): Observable<User[]> {
    return this.getUsersHttp(this.usersURL)
      .pipe(
        map(users => this.filterUsers(users)),
      );
  }

  getUsersHttp(url: string): Observable<User[]> {
    return this.http.get<User[]>(url);
  }

  getPostsHttp(url: string): Observable<Post[]> {
    return this.http.get<Post[]>(url);
  }

  filterUsers(users: User[]) {
    return users.filter(user => user.id % 2 === 0);
  }

  mapNamesToPosts(user: User, post: Post): Userpost {
    // TODO
    return null;
  }
}