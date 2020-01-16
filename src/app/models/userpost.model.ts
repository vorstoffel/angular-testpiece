import { User } from './user.model';
import { Post } from './post.model';

export interface Userpost {
    id: number;
    // userId: string;
    username: string;
    name: string;
    title: string;
    body: string;
}

export interface Userpost2 extends User {
    posts: Post[];
}