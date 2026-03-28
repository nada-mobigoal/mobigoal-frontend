import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Results } from './results';
import { Router } from '@angular/router';

describe('Results Component', () => {
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [Results, RouterTestingModule]
    });
    router = TestBed.inject(Router);
  });

  it('should create the results component', () => {
    const fixture = TestBed.createComponent(Results);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should calculate correct percentage', () => {
    const fixture = TestBed.createComponent(Results);
    const component = fixture.componentInstance;
    
    component.correctCount = 2;
    component.totalCount = 3;
    
    expect(component.getPercentage()).toBe(67);
  });

  it('should return excellent score class for 80%+', () => {
    const fixture = TestBed.createComponent(Results);
    const component = fixture.componentInstance;
    
    component.correctCount = 4;
    component.totalCount = 5;
    
    expect(component.getScoreClass()).toBe('excellent');
  });

  it('should return good score class for 60-79%', () => {
    const fixture = TestBed.createComponent(Results);
    const component = fixture.componentInstance;
    
    component.correctCount = 3;
    component.totalCount = 5;
    
    expect(component.getScoreClass()).toBe('good');
  });

  it('should return needs-work score class for <60%', () => {
    const fixture = TestBed.createComponent(Results);
    const component = fixture.componentInstance;
    
    component.correctCount = 2;
    component.totalCount = 5;
    
    expect(component.getScoreClass()).toBe('needs-work');
  });

  it('should navigate to practice on retry', () => {
    const fixture = TestBed.createComponent(Results);
    const component = fixture.componentInstance;
    const routerSpy = spyOn(router, 'navigate');
    
    component.retry();
    
    expect(routerSpy).toHaveBeenCalledWith(['/practice']);
  });

  it('should navigate to home on goHome', () => {
    const fixture = TestBed.createComponent(Results);
    const component = fixture.componentInstance;
    const routerSpy = spyOn(router, 'navigate');
    
    component.goHome();
    
    expect(routerSpy).toHaveBeenCalledWith(['/home']);
  });
});
