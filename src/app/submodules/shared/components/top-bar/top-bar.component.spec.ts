import { TopBarComponent } from './top-bar.component';

describe('#TopBarComponent', () => {
  let component: TopBarComponent;

  beforeEach(() => {
    component = new TopBarComponent();
  });

  it('should create the top bar component', () => {
    expect(component).toBeTruthy();
  });
});
