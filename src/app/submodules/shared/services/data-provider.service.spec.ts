import { DataProviderService } from './data-provider.service';
import { of } from 'rxjs';

import { users, posts, comments } from './json-placeholder.mock';

describe('#DataProviderService', () => {
  let service: DataProviderService;
  let http;

  beforeEach(() => {
    http = {
      get: jasmine.createSpy('get'),
      post: jasmine.createSpy('post'),
      delete: jasmine.createSpy('delete')
    };
    service = new DataProviderService(http);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getUsers', () => {
    it('should call getUsers method', () => {
      service.getUsers();

      expect(http.get).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/users');
    });
  });

  describe('#getComments', () => {
    it('should call getComments method', () => {
      service.getComments();

      expect(http.get).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/comments');
    });
  });

  describe('#getPosts', () => {
    it('should call getPosts method', () => {
      service.getPosts();

      expect(http.get).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/posts');
    });
  });

  describe('#createPost', () => {
    it('should call createPost method', () => {
      const post = {
        title: 'title',
        body: 'text',
        userId: 1,
        id: 101
      };
      service.createPost(post);

      expect(http.post).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/posts', post);
    });
  });

  describe('#deletePost', () => {
    it('should call deletePost method', () => {
      service.deletePost(1);

      expect(http.delete).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/posts/1');
    });
  });

  describe('#getUsersWithPosts', () => {
    it('should call getUsersWithPosts method', () => {
      spyOn(service, 'getUsers').and.returnValue(of(users));
      spyOn(service, 'getPosts').and.returnValue(of(posts));

      service.getUsersWithPosts().subscribe(data => {
        expect(data).toEqual(
          [{ ...users[0], posts: [posts[0]] }, { ...users[1], posts: [posts[1]]}]
        );
      });
    });
  });

  describe('#getPostsWithComments', () => {
    it('should call getPostsWithComments method', () => {
      spyOn(service, 'getUsers').and.returnValue(of(users));
      spyOn(service, 'getPosts').and.returnValue(of(posts));
      spyOn(service, 'getComments').and.returnValue(of(comments));

      service.getPostsWithComments().subscribe(data => {
        expect(data).toEqual(
          [
            { ...posts[0], userName: users[0].name, comments: [comments[0], comments[1]] },
            { ...posts[1], userName: users[1].name, comments: [comments[2]] },
            { ...posts[2], userName: undefined, comments: [] }]
        );
      });
    });
  });
});
