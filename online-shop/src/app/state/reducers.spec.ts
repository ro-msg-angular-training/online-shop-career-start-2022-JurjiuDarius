import {
  activateEdit,
  deleteProduct,
  deleteProductFailure,
  deleteProductSuccess,
  editProductFailure,
  editProductSuccess,
  getAllProducts,
  getAllProductsFailure,
  getAllProductsSuccess,
  loadProduct,
  loadProductSuccess,
} from './actions';
import { productsEntityReducer } from './reducers';
import { initialProductsEntityState } from './state';

describe('Testing reducer', () => {
  it('should properly load all', () => {
    let initialState = initialProductsEntityState;
    let state = productsEntityReducer(initialState, getAllProducts());
    expect(state.status).toBe('pending');
    state = productsEntityReducer(
      state,
      getAllProductsSuccess({ products: [] })
    );
    expect(state.status).toBe('success');
    state = productsEntityReducer(
      state,
      getAllProductsFailure({ error: 'test error' })
    );
    expect(state.error).toBe('test error');
  });

  it('should properly load single', () => {
    let initialState = initialProductsEntityState;
    initialState = {
      ...initialState,
      entities: { '1': { name: 'test name', category: '', price: 0 } },
      ids: ['1'],
    };
    let state = productsEntityReducer(initialState, loadProduct({ id: '1' }));
    expect(state.status).toBe('pending');
    state = productsEntityReducer(
      state,
      loadProductSuccess({
        product: {
          id: '1',
          changes: {
            id: '1',
            name: 'test name',
            category: '',
            price: 0,
            description: 'test description',
          },
        },
      })
    );
    expect(state.entities['1']?.name).toBe('test name');
    state = productsEntityReducer(
      state,
      getAllProductsFailure({ error: 'test error' })
    );
    expect(state.error).toBe('test error');
  });
  it('should properly edit', () => {
    let initialState = initialProductsEntityState;
    initialState = {
      ...initialState,
      entities: {
        '1': {
          name: 'test name',
          category: '',
          price: 0,
          description: 'initial description',
        },
      },
      ids: ['1'],
    };
    let state = productsEntityReducer(initialState, activateEdit());
    expect(state.status).toBe('success');
    state = productsEntityReducer(
      state,
      editProductSuccess({
        product: {
          id: '1',
          changes: {
            id: '1',
            name: 'test name',
            category: '',
            price: 0,
            description: 'test description edit',
          },
        },
      })
    );
    expect(state.entities['1']?.description).toBe('test description edit');
    state = productsEntityReducer(
      state,
      editProductFailure({ error: 'test error' })
    );
    expect(state.error).toBe('test error');
  });

  it('should properly load single', () => {
    let initialState = initialProductsEntityState;
    initialState = {
      ...initialState,
      entities: { '1': { name: 'test name', category: '', price: 0 } },
      ids: ['1'],
    };
    let state = productsEntityReducer(initialState, loadProduct({ id: '1' }));
    expect(state.status).toBe('pending');
    state = productsEntityReducer(
      state,
      loadProductSuccess({
        product: {
          id: '1',
          changes: {
            id: '1',
            name: 'test name',
            category: '',
            price: 0,
            description: 'test description',
          },
        },
      })
    );
    expect(state.entities['1']?.name).toBe('test name');
    state = productsEntityReducer(
      state,
      getAllProductsFailure({ error: 'test error' })
    );
    expect(state.error).toBe('test error');
  });

  it('should properly delete', () => {
    let initialState = initialProductsEntityState;
    initialState = {
      ...initialState,
      entities: {
        '1': {
          name: 'test name',
          category: '',
          price: 0,
          description: 'initial description',
        },
      },
      ids: ['1'],
    };
    let state = productsEntityReducer(initialState, deleteProduct);
    expect(state.status).toBe('pending');
    state = productsEntityReducer(
      state,
      deleteProductSuccess({
        id: '1',
      })
    );
    expect(state.entities['1']?.name).toBe(undefined);
    state = productsEntityReducer(
      state,
      deleteProductFailure({ error: 'test error' })
    );
    expect(state.error).toBe('test error');
  });
});
