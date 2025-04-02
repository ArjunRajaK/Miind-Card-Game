import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [RouterModule, DialogModule, ButtonModule],
      providers: [{ provide: Router, useValue: routerSpy }],
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the component and set initial visibility', () => {
    expect(component).toBeTruthy();
    expect(component.visible).toBe(true);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should call startGame() and navigate to /grid', () => {
    component.startGame();
    expect(component.visible).toBe(false);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/grid']);
  });
});
