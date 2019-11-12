import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, flatMap, groupBy } from 'rxjs/operators';
import { Observable, combineLatest } from 'rxjs';
import { User } from './models/user.model';
import { Post } from './models/post.model';
import { Userpost } from './models/userpost.model';

export type Userposts = Map<number, Post[]>;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  usersURL = 'https://jsonplaceholder.typicode.com/users';
  postsURL = 'https://jsonplaceholder.typicode.com/posts';

  // users$: Observable<User[]>;
  // userposts$: Observable<Userpost[]>;
  userposts$: Observable<Userposts>;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    // this.users$ = this.getEvenUsers();
    // this.userposts$ = this.getEvenUserposts();

    this.userposts$ = this.createPostMap();
    this.createPostMap().subscribe( test => {console.log('RESULT ', test)})
  }

  // Post[] will be mapped to Userpost[]
  getEvenUserposts(): Observable<Userpost[]> {
    return combineLatest([this.getEvenUsers(), this.getPostsHttp(this.postsURL)]).pipe(
      map(([users, posts]) => {
        return posts.reduce((userposts, post) => {
          let user: User = users.find(user => user.id === post.userId);
          if (user != undefined) {
            userposts.push({
              id: user.id,
              username: user.username,
              name: user.name,
              title: post.title,
              body: post.body
            })
          }
          return userposts;
        }, [] as Userpost[])
      })
    );
  }


  createPostMap(): Observable<Userposts> {
    return this.getPostsHttp(this.postsURL).pipe(
      map(posts => {
        return posts.reduce((accumulator, post) => {
          const userId = post.userId;
          const userPosts = accumulator.get(userId);
          if (userPosts) {
            const newPosts = userPosts.concat([post]);
            return accumulator.set(userId, newPosts);      
          } else {
            return accumulator.set(userId, [post]);
          }
        }, new Map<number, Post[]>())
      })
    );
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

  filterUsers(users: User[]): User[] {
    return users.filter(user => user.id % 2 === 0);
  }
}