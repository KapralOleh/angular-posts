import { PostComponent } from './post.component';

describe('#PostComponent', () => {
  let component: PostComponent;

  beforeEach(() => {
    component = new PostComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#openDetailedDialog', () => {
    it('should call openDetailedDialog method', () => {
      component.openDialog.emit = jasmine.createSpy('openDialog.emit');
      component.openDetailedDialog(1);

      expect(component.openDialog.emit).toHaveBeenCalledWith(1);
    });
  });

  describe('#deletePost', () => {
    it('should call deletePost method', () => {
      component.openDeleteDialog.emit = jasmine.createSpy('openDeleteDialog.emit');
      component.deletePost(1);

      expect(component.openDeleteDialog.emit).toHaveBeenCalledWith(1);
    });
  });
});
