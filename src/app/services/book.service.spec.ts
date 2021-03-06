import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { environment } from "src/environments/environment.prod";
import Swal from "sweetalert2";
import { Book } from "../models/book.model";
import { BookService } from "./book.service";

describe('book.service', () => {

  let bookService: BookService;
  let httpMock: HttpTestingController;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        BookService,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    });

  });

  beforeEach(() => {

    bookService = TestBed.inject(BookService);
    httpMock = TestBed.inject(HttpTestingController);

  });

  afterEach(() => {

    httpMock.verify();

  });

  it('should be create an instance', () => {
    expect(bookService).toBeTruthy();
  });

  it('should be call getBooks and return a lista of book and does a get method', () => {

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

    bookService.getBooks().subscribe((books: Book[]) => {
      expect(books).toEqual(listBook);
    });

    const req = httpMock.expectOne(environment.API_REST_URL + `/book`);
    expect(req.request.method).toBe('GET');
    req.flush(listBook);

  });

  it('should be call getBooksFromCart and return empty array when localStorage is empty', () => {

    const storageMock = {};

    const spy01 = spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      return storageMock[key] ? JSON.stringify(storageMock[key]) : null;
    });

    const listBook = bookService.getBooksFromCart();
    expect(spy01).toHaveBeenCalled();
    expect(listBook.length).toBe(0);

  });

  it('should be call getBooksFromCart and return array of books when localStorage is not empty', () => {

    let storageMock = {
      'listCartBook': [
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
      ],
    };


    const spy01 = spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      return storageMock[key] ? JSON.stringify(storageMock[key]) : null;
    });

    const listBook = bookService.getBooksFromCart();
    expect(spy01).toHaveBeenCalled();
    expect(listBook.length !== 0).toBeTrue();

  });

  it('should be call addBookToCart and add a book successfully when the list does not exist in the localstorage', () =>{

    const toast = {
      fire: () => null,
    } as any;

    const book: Book = {
      author: '',
      name: '',
      isbn: '',
      amount: 2,
      price: 10,
    };

    const storageMock = {};

    const spy01 = spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      return storageMock[key] ? JSON.stringify(storageMock[key]) : null;
    });

    const spy02 = spyOn(localStorage, 'setItem').and.callFake((key: string, value: string) => {
      return storageMock[key] = value;
    });

    const spy03 = spyOn(Swal, 'mixin').and.callFake(() => toast)

    let listBook = bookService.getBooksFromCart();
    expect(listBook.length === 0).toBeTrue();

    bookService.addBookToCart(book);

    listBook = bookService.getBooksFromCart();
    expect(listBook.length !== 0).toBeTrue();

    expect(spy01).toHaveBeenCalled();
    expect(spy02).toHaveBeenCalled();
    expect(spy03).toHaveBeenCalled();

  });

  it('should be call removeBooksFromCart and remove a book on the localstorage correctly', () => {
    const storageMock = {};
    const book: Book = {
      author: '',
      name: '',
      isbn: '',
      amount: 2,
      price: 10,
    };

    const spy01 = spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      return storageMock[key] ? JSON.stringify(storageMock[key]) : null;
    });

    const spy02 = spyOn(localStorage, 'setItem').and.callFake((key: string, value: string) => {
      return storageMock[key] = value;
    });

    bookService.addBookToCart(book);
    let listBook = bookService.getBooksFromCart();
    expect(listBook.length !== 0).toBe(true);
    bookService.removeBooksFromCart();
    listBook = bookService.getBooksFromCart();
    expect(listBook.length === 0).toBe(true);

    expect(spy01).toHaveBeenCalled();
    expect(spy02).toHaveBeenCalled();

  });

});
