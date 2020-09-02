import { DetailedPostDialogComponent } from './detailed-post-dialog.component';

describe('#DetailedPostDialogComponent', () => {
  let component: DetailedPostDialogComponent;
  let dialogRef;
  let post;

  beforeEach(() => {
    dialogRef = {
      close: jasmine.createSpy('close')
    };
    post = {};
    component = new DetailedPostDialogComponent(dialogRef, post);
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

  describe('#trackByCommentId', () => {
    it('should call trackByCommentId method', () => {
      const result = component.trackByCommentId(1, {
        id: 123
      } as any);

      expect(result).toEqual('1_123');
    });
  });
});
