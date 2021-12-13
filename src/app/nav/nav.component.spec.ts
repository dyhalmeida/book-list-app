import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { NavComponent } from "./nav.component";

class ComponentTestRoute {}

describe('nav.component.', () => {

  let navComponent: NavComponent;
  let fixture: ComponentFixture<NavComponent>;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          {
            path: 'home', component: ComponentTestRoute,
          },
          {
            path: 'cart', component: ComponentTestRoute,
          }
        ])
      ],
      declarations: [
        NavComponent,
      ],
      providers: [

      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();

  });

  beforeEach(() => {

    fixture = TestBed.createComponent(NavComponent);
    navComponent = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should be create an instance', () => {
    expect(navComponent).toBeTruthy();
  });

  it('shoud be navigate', () => {

    const router = TestBed.inject(Router);
    const spy01 = spyOn(router, 'navigate');

    navComponent.navTo('home');
    expect(spy01).toHaveBeenCalledWith(['/home']);

    navComponent.navTo('cart');
    expect(spy01).toHaveBeenCalledWith(['/cart']);

  });

});
