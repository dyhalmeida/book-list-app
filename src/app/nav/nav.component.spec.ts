import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Router } from "@angular/router";
import { NavComponent } from "./nav.component";

const routerMock = {
  navigate: () => {

  }
}

describe('nav.component.', () => {

  let navComponent: NavComponent;
  let fixture: ComponentFixture<NavComponent>;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [

      ],
      declarations: [
        NavComponent,
      ],
      providers: [
        {
          provide: Router,
          useValue: routerMock,
        }
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

    navComponent.navTo('');
    expect(spy01).toHaveBeenCalled();

  });

});
