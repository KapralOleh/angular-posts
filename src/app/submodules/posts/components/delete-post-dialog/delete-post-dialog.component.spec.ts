import { DeletePostDialogComponent } from './delete-post-dialog.component';

describe('#DeletePostDialogComponent', () => {
  let component: DeletePostDialogComponent;
  let dialogRef;

  beforeEach(() => {
    dialogRef = {
      close: jasmine.createSpy('close')
    };
    component = new DeletePostDialogComponent(dialogRef);
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
});
