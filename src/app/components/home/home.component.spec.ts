import { HomeComponent } from './home.component';

describe('#HomeComponent', () => {
  let component: HomeComponent;
  let userService;

  beforeEach(() => {
    userService = {
      user: {
        name: 'John Doe'
      }
    };
    component = new HomeComponent(userService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#ngOnInit', () => {
    it('should call ngOnInit method', () => {
      component.ngOnInit();
      expect(component.name).toEqual('John Doe');
    });
  });
});
