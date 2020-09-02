import { PostsPageComponent } from './posts-page.component';
import { of } from 'rxjs';
import { users, posts, comments } from '../../../shared/services/json-placeholder.mock';

describe('#PostsPageComponent', () => {
  let component: PostsPageComponent;
  let dataProviderService;
  let dialog;
  let userService;
  let cdr;
  const postsMock = [
    { ...posts[0], userName: users[0].name, comments: [comments[0], comments[1]] },
    { ...posts[1], userName: users[1].name, comments: [comments[2]] },
    { ...posts[2], userName: undefined, comments: [] }];

  beforeEach(() => {
    dataProviderService = {
      getPostsWithComments: jasmine.createSpy('getPostsWithComments').and.returnValue(of(postsMock)),
      createPost: jasmine.createSpy('createPost').and.returnValue(of({
        title: '',
        body: '',
        userId: 1,
        id: 101
      })),
      deletePost: jasmine.createSpy('deletePost').and.returnValue(of({}))
    };
    dialog = {
      open: jasmine.createSpy('open').and.returnValue({
        afterClosed: jasmine.createSpy('afterClosed').and.returnValue(of({
          title: '',
          body: '',
          userId: 1,
          id: 101
        }))
      })
    };
    userService = {
      user: {
        id: 1
      }
    };
    cdr = {
      markForCheck: jasmine.createSpy('markForCheck')
    };
    component = new PostsPageComponent(
      dataProviderService,
      dialog,
      userService,
      cdr
    );
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#ngOnInit', () => {
    it('should call ngOnInit method', () => {

      expect(component.userId).toEqual(1);
      expect(component.posts).toEqual(postsMock);
      expect(dataProviderService.getPostsWithComments).toHaveBeenCalled();
      expect(cdr.markForCheck).toHaveBeenCalled();
    });
  });

  describe('#openDetailedDialog', () => {
    it('should call openDetailedDialog method', () => {
      component.openDetailedDialog(1);

      expect(dialog.open).toHaveBeenCalledWith(jasmine.any(Function), { width: '80vw', data: postsMock[0]});
    });
  });

  describe('#openDeleteDialog', () => {
    it('should call openDeleteDialog method', () => {
      component.openDeleteDialog(2);

      expect(dataProviderService.deletePost).toHaveBeenCalledWith(2);
      expect(dialog.open).toHaveBeenCalledWith(jasmine.any(Function), { width: '250px'});
      expect(cdr.markForCheck).toHaveBeenCalled();
    });
  });

  describe('#trackByPostId', () => {
    it('should call trackByPostId method', () => {
      const result = component.trackByPostId(1, {
        id: 123
      } as any);

      expect(result).toEqual('1_123');
    });
  });
});
