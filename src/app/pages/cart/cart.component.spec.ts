import { HttpClientTestingModule } from "@angular/common/http/testing";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Book } from "src/app/models/book.model";
import { BookService } from "src/app/services/book.service";
import { CartComponent } from "./cart.component";

describe('cart.component', () => {

  let cartComponent: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let bookService: BookService;

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
    bookService = fixture.debugElement.injector.get(BookService);
    spyOn(bookService, 'getBooksFromCart').and.callFake(() => null);

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

  it('Should call onInputNumberChange and increments correctly', () => {

    const action = 'plus';
    const book: Book = {
      author: '',
      name: '',
      isbn: '',
      amount: 2,
      price: 10,
    };

    /** Injeta corretamente o serviço no teste */
    const bookService = fixture.debugElement.injector.get(BookService);
    const spy01 = spyOn(bookService, 'updateAmountBook').and.callFake(() => undefined);
    const spy02 = spyOn(cartComponent, 'getTotalPrice').and.callFake(() => undefined);

    expect(book.amount).toBe(2);

    cartComponent.onInputNumberChange(action, book);

    expect(spy01).toHaveBeenCalled();
    expect(spy02).toHaveBeenCalled();

    expect(book.amount).toBe(3);

  });

  it('Should call onInputNumberChange and decrements correctly', () => {

    const action = 'minus';
    const book: Book = {
      author: '',
      name: '',
      isbn: '',
      amount: 2,
      price: 10,
    };

    /** Injeta corretamente o serviço no teste */
    const bookService = fixture.debugElement.injector.get(BookService);
    const spy01 = spyOn(bookService, 'updateAmountBook').and.callFake(() => undefined);
    const spy02 = spyOn(cartComponent, 'getTotalPrice').and.callFake(() => undefined);

    expect(book.amount).toBe(2);

    cartComponent.onInputNumberChange(action, book);

    expect(spy01).toHaveBeenCalled();
    expect(spy02).toHaveBeenCalled();

    expect(book.amount).toBe(1);

  });

  it('Should call _clearListCartBook and to check works correctly', () => {

    const bookService = fixture.debugElement.injector.get(BookService);

    const spy01 = spyOn(cartComponent as any, '_clearListCartBook').and.callThrough();
    const spy02 = spyOn(bookService, 'removeBooksFromCart').and.callFake(() => null);

    cartComponent.listCartBook = [
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

    cartComponent.onClearBooks();

    expect(spy01).toHaveBeenCalled();
    expect(spy02).toHaveBeenCalled();
    expect(cartComponent.listCartBook.length).toBe(0);

  });

  it('Should call private _clearListCartBook and to check works correctly', () =>{

    cartComponent.listCartBook = [
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

    const bookService = fixture.debugElement.injector.get(BookService);
    const spy01 = spyOn(bookService, 'removeBooksFromCart').and.callFake(() => null);

    cartComponent['_clearListCartBook']();

    expect(spy01).toHaveBeenCalled();
    expect(cartComponent.listCartBook.length === 0).toBeTrue();

  });

});
