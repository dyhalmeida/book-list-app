import { HttpClientTestingModule } from "@angular/common/http/testing";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Book } from "src/app/models/book.model";
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

  it('getTotalPrice returns an amount', () => {

    const listBook: Book[] = [
      {
        author: '',
        name: '',
        isbn: '',
        amount: 2,
        price: 10,
      },
      {
        author: '',
        name: '',
        isbn: '',
        amount: 3,
        price: 10,
      },
    ];

    const totalPrice = cartComponent.getTotalPrice(listBook);

    expect(totalPrice).toBe(50);

  });

});
