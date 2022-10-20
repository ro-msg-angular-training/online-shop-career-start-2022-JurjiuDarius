import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Observable, of } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';
import { ProductService } from '../all-products/all-products-smart/product.service';
import { AllProductsEntityEffects } from './effects';

class MockUserService {
  getProducts() {
    return of([]);
  }
  getProductById(id: String) {
    return of({ name: '', category: '', price: 0, id: id });
  }
}
describe('ResortEffects', () => {
  let actions$: Observable<any>;
  let effects: AllProductsEntityEffects;
  let store: MockStore<any>;
  let productService: ProductService;
  let serviceSpy: any;
  let testScheduler: TestScheduler;

  beforeEach(() => {
    const initialState = { entities: [], ids: [] };
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        provideMockStore({ initialState }),
        provideMockActions(() => actions$),
        { provide: ProductService },

        AllProductsEntityEffects,
        {
          provide: ProductService,
          useClass: MockUserService,
        },
      ],
    }).compileComponents();
    productService = new ProductService(TestBed.inject(HttpClient));
    effects = TestBed.inject(AllProductsEntityEffects);
    store = TestBed.inject(MockStore);
    serviceSpy = jasmine.createSpyObj('productService', [
      'getProducts',
      'getProductById',
    ]);
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });
  it('should properly get products', () => {
    actions$ = of({
      type: '[All products] Get products',
      payload: { products: [] },
    });
    console.log(effects);
    effects.$getAllProducts.subscribe((action) => {
      expect(action.type).toBe('[Products API] Get products Success');
      expect(action.products).toEqual([]);
    });
  });
});
