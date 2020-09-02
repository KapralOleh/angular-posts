import { AppComponent } from './app.component';
import { fakeAsync, tick } from '@angular/core/testing';

describe('#AppComponent', () => {
  let component;
  let userService;
  let cdr;

  beforeEach(() => {
    userService = {
      user: {
        username: 'username',
        id: 1
      }
    };
    cdr = {
      markForCheck: jasmine.createSpy('markForCheck')
    };
    component = new AppComponent(userService, cdr);
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  describe('#ngOnInit', () => {
    it(`should call OnInit`, () => {
      component.ngOnInit();

      expect(component.username).toEqual('username');
      expect(component.userLink).toEqual('users/1');
    });
  });

  describe('#toggleSideNav', () => {
    it(`should call toggleSideNav`, fakeAsync(() => {
      component.toggleSideNav({
        toggle: () => {}
      } as any);

      tick(200);

      expect(cdr.markForCheck).toHaveBeenCalled();
    }));
  });
});
