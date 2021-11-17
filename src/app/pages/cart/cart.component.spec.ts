import { HttpClientTestingModule } from "@angular/common/http/testing";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { BookService } from "src/app/services/book.service";
import { CartComponent } from "./cart.component";

describe('cart.component', () => {

  let cartComponent: CartComponent;
  let fixture: ComponentFixture<CartComponent>;

  beforeEach(() => {

    TestBed.configureTestingModule({

      imports: [
        HttpClientTestingModule
      ],
      declarations: [
        CartComponent,
      ],
      providers: [
        BookService,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],

    }).compileComponents();

  });

  beforeEach(() => {

    fixture = TestBed.createComponent(CartComponent);
    cartComponent = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('Should create', () => {

    expect(cartComponent).toBeTruthy();

  });

});
