import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, combineLatest } from 'rxjs';
import { User } from './models/user.model';
import { Post } from './models/post.model';
import { Userpost, Userpost2 } from './models/userpost.model';

export type Userposts = Map<number, Post[]>;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  usersURL = 'https://jsonplaceholder.typicode.com/users';
  postsURL = 'https://jsonplaceholder.typicode.com/posts';

  // userposts$: Observable<Userposts>;
  userposts$: Observable<Userpost2[]>;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    // this.userposts$ = this.createUserposts();
    // this.createUserposts().subscribe(test => { console.log('RESULT ', test) })

    this.userposts$ = combineLatest([this.getUsersHttp(this.usersURL), this.getPostsHttp(this.postsURL)])
      .pipe(
        map(([users, posts]) => {
          return this.mapToUserpostsReduce(users, posts);
        })
      );

    /* this.userposts$ = combineLatest([this.getEvenUsers(), this.getPostsHttp(this.postsURL)])
          .pipe(
            map(([users, posts]) => {
              return this.mapToUserposts(users, posts);
            })
          ); */
  }

  mapToUserpostsReduce(users: User[], posts: Post[]): Userpost2[] {
    return users.reduce((userposts, user) => {

      /*       let postsOfUsers: Post[] = posts.reduce((posts, post) => {
              if (user.id === post.userId) {
                posts.push(post);
              }
              return posts;
            }, [] as Post[]); */

      let PostsOfUsersFilter: Post[] = posts.filter(post => post.userId === user.id);

      let userpost2: Userpost2 = {
        ...user,
        posts: PostsOfUsersFilter
      }
      userposts.push(userpost2);
      return userposts;
    }, [] as Userpost2[]);
  }

  mapToUserposts(users: User[], posts: Post[]): Userpost2[] {
    let userposts: Userpost2[] = [];

    for (let i = 0; i < users.length; i++) {
      let postsOfUsers: Post[] = [];

      for (let j = 0; j < posts.length; j++) {
        if (users[i].id === posts[j].userId) {
          postsOfUsers.push(posts[j]);
        }
      }

      let userpost2: Userpost2 = {
        ...users[i],
        posts: postsOfUsers,
      }
      userposts.push(userpost2);
    }
    return userposts;
  }

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

  createUserposts(): Observable<Userposts> {
    return this.getPostsHttp(this.postsURL).pipe(
      map(posts => {
        return null;
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