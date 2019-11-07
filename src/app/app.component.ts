import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User } from './user.model';
import { Post } from './post.model';

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
    this.users$ = this.getUsers(this.usersURL)
      .pipe(
        map(users => this.filterUsers(users)),
      );
  }

  getUsers(url: string): Observable<User[]> {
    return this.http.get<User[]>(url);
  }

  getPosts(url: string): Observable<Post[]> {
    return this.http.get<Post[]>(url);
  }

  filterUsers(users: User[]) {
    return users.filter(user => user.id % 2 === 0);
  }
}