import { UsersPageComponent } from './users-page.component';
import { of, throwError } from 'rxjs';
import { users, posts } from '@shared/services/json-placeholder.mock';

describe('#UsersPageComponent', () => {
  let component: UsersPageComponent;
  let dataProviderService;
  let dialog;
  let actRoute;
  let cdr;
  const usersMock = [{ ...users[0], posts: [posts[0]] }, { ...users[1], posts: [posts[1]] }];

  beforeEach(() => {
    dataProviderService = {
      getUsersWithPosts: jasmine.createSpy('getUsersWithPosts').and.returnValue(of(usersMock))
    };
    dialog = {
      open: jasmine.createSpy('open')
    };
    actRoute = {
      snapshot: {
        params: {
          id: '1'
        }
      }
    };
    cdr = {
      markForCheck: jasmine.createSpy('markForCheck')
    };
    component = new UsersPageComponent(
      dataProviderService,
      dialog,
      actRoute,
      cdr
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#ngOnInit', () => {
    it('should call ngOnInit method', () => {
      component.ngOnInit();

      expect(dataProviderService.getUsersWithPosts).toHaveBeenCalled();
      expect(component.users).toEqual(usersMock);
      expect(cdr.markForCheck).toHaveBeenCalled();
    });

    it('getUsersWithPosts should throw error', () => {
      dataProviderService.getUsersWithPosts.and.returnValue(throwError('error'));
      component.ngOnInit();

      expect(dataProviderService.getUsersWithPosts).toHaveBeenCalled();
      expect(component.users).toEqual([]);
    });
  });

  describe('#ngOnDestroy', () => {
    it('should call ngOnDestroy method', () => {
      component.ngOnInit();
      component.ngOnDestroy();

      expect(component['dataSubsription'].closed).toEqual(true);
    });
  });

  describe('#openDetailedDialog', () => {
    it('should call openDetailedDialog method', () => {
      component.ngOnInit();
      component.openDetailedDialog(1);

      expect(dialog.open).toHaveBeenCalledWith(jasmine.any(Function), { width: '80vw', data: usersMock[0] });
      expect(cdr.markForCheck).toHaveBeenCalled();
    });
  });

  describe('#trackByUserId', () => {
    it('should call trackByUserId method', () => {
      const result = component.trackByUserId(1, {
        id: 123
      } as any);

      expect(result).toEqual('1_123');
    });
  });
});
