import { CreatePostDialogComponent } from './create-post-dialog.component';

describe('#CreatePostDialogComponent', () => {
  let component: CreatePostDialogComponent;
  let dialogRef;
  let userService;

  beforeEach(() => {
    dialogRef = {
      close: jasmine.createSpy('close')
    };
    userService = {
      user: {
        name: 'John Doe'
      }
    };
    component = new CreatePostDialogComponent(dialogRef, userService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.name).toEqual('John Doe');
  });

  it('should get title', () => {
    expect(component.title.valid).toEqual(false);
  });

  it('should get body', () => {
    expect(component.body.valid).toEqual(false);
  });

  describe('#onNoClick', () => {
    it('should call onNoClick method', () => {
      component.onNoClick();

      expect(dialogRef.close).toHaveBeenCalled();
    });
  });

  describe('#submit', () => {
    it('should call submit method', () => {
      expect(component.submitPressed).toEqual(undefined);

      component.submit();

      expect(dialogRef.close).not.toHaveBeenCalled();
      expect(component.submitPressed).toEqual(true);
    });

    it('should call submit method', () => {
      component.title.setValue('Title');
      component.body.setValue('Body');
      component.submit();

      expect(dialogRef.close).toHaveBeenCalledWith({ title: 'Title', body: 'Body', userId: 1, id: 101 });
    });
  });
});
