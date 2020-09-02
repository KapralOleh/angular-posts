
import { UserComponent } from './user.component';

describe('#UserComponent', () => {
  let component: UserComponent;

  beforeEach(() => {
    component = new UserComponent();
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
});
