import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Home } from './home';
import { Router } from '@angular/router';

describe('Home Component', () => {
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [Home, RouterTestingModule]
    });
    router = TestBed.inject(Router);
  });

  it('should create the home component', () => {
    const fixture = TestBed.createComponent(Home);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should navigate to practice when startPractice is called', () => {
    const fixture = TestBed.createComponent(Home);
    const component = fixture.componentInstance;
    const routerSpy = spyOn(router, 'navigate');
    
    component.startPractice();
    
    expect(routerSpy).toHaveBeenCalledWith(['/practice']);
  });
});
