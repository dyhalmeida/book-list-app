import { HttpClientTestingModule } from "@angular/common/http/testing";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Pipe, PipeTransform } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { of } from "rxjs";
import { Book } from "src/app/models/book.model";
import { BookService } from "src/app/services/book.service";
import { HomeComponent } from "./home.component";

/** Mock listBook */
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

/** Mock bookService */
const BookServiceMock = {
  getBooks: () => of(listBook)
}

/** Mock reduceTextPipe */
@Pipe({
  name: 'reduceText'
})
class ReduceTextPipeMock implements PipeTransform {
  transform(): string {
    return '';
  }
}

describe('home.component', () => {

  let homeComponent: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let bookService: BookService;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      declarations: [
        HomeComponent,
        ReduceTextPipeMock,
      ],
      providers: [
        {
          provide: BookService,
          useValue: BookServiceMock
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();

  });

  beforeEach(() => {

    fixture = TestBed.createComponent(HomeComponent);
    homeComponent = fixture.componentInstance;
    fixture.detectChanges();
    bookService = fixture.debugElement.injector.get(BookService);

  });

  it('Should call getBooks and get books from the subscription', () => {

    homeComponent.getBooks();
    expect(homeComponent.listBook.length === 2).toBeTrue();

  });

});
