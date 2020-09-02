import { DetailedUserDialogComponent } from './detailed-user-dialog.component';

describe('#DetailedUserDialogComponent', () => {
  let component: DetailedUserDialogComponent;
  let dialogRef;
  let user;
  let router;

  beforeEach(() => {
    dialogRef = {
      close: jasmine.createSpy('close')
    };
    user = {};
    router = {
      navigateByUrl: jasmine.createSpy('navigateByUrl')
    };
    component = new DetailedUserDialogComponent(dialogRef, user, router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#onNoClick', () => {
    it('should call onNoClick method', () => {
      component.onNoClick();

      expect(dialogRef.close).toHaveBeenCalled();
    });
  });

  describe('#showMore', () => {
    it('should call showMore method', () => {
      expect(component.limit).toEqual(3);

      component.showMore();

      expect(component.limit).toEqual(6);
    });
  });

  describe('#goToPost', () => {
    it('should call goToPost method', () => {
      component.goToPost('1');

      expect(router.navigateByUrl).toHaveBeenCalledWith('/posts/1');
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
