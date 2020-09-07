import { PageNotFoundComponent } from './page-not-found.component';

describe('#PageNotFoundComponent', () => {
  let component: PageNotFoundComponent;
  let userService;

  beforeEach(() => {
    userService = {
      user: {
        name: 'John Doe'
      }
    };
    component = new PageNotFoundComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
