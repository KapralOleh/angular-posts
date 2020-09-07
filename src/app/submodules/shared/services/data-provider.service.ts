import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser, IPost, IComment } from './data.models';
import { forkJoin, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataProviderService {
  posts: IPost[];
  users: IUser[];

  private readonly URL: string = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${this.URL}/users`);
  }

  getComments(): Observable<IComment[]> {
    return this.http.get<IComment[]>(`${this.URL}/comments`);
  }

  getPosts(): Observable<IPost[]> {
    return this.http.get<IPost[]>(`${this.URL}/posts`);
  }

  createPost(body: IPost): Observable<object> {
    return this.http.post(`${this.URL}/posts`, body);
  }

  deletePost(id: number): Observable<object> {
    return this.http.delete(`${this.URL}/posts/${id}`);
  }

  getUsersWithPosts(): Observable<IUser[]> {
    if (this.users) {
      return of(this.users);
    }
    return forkJoin([this.getUsers(), this.getPosts()]).pipe(
      mergeMap((data: [IUser[], IPost[]]) => {
        data[0].forEach((user: IUser) => {
          user.posts = data[1].filter((post: IPost) => user.id === post.userId);
        });

        this.users = data[0];
        return of(data[0]);
      })
    );
  }

  getPostsWithComments(): Observable<IPost[]> {
    if (this.posts) {
      return of(this.posts);
    }
    return forkJoin([this.getPosts(), this.getUsers(), this.getComments()]).pipe(
      mergeMap((data: [IPost[], IUser[], IComment[]]) => {
        data[0].forEach((post: IPost) => {
          const userData: IUser = data[1].find((user: IUser) => user.id === post.userId);
          post.userName = userData && userData.name;
          post.comments = data[2].filter((comment: IComment) => comment.postId === post.id);
        });

        this.posts = data[0];
        return of(data[0]);
      })
    );
  }
}
