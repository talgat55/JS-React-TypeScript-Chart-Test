import { call, put, takeEvery } from 'redux-saga/effects';
import {productsActions as types} from '../actions/products'
import {fetchProductsAPI} from '../../api/products'
import { SET_PRODUCTS } from '../reducers/products';
import { IProductItem } from '../../ts/interfaces/products';

export function* getProducts () {
    try {
        let result: { data: IProductItem[] } = yield call(fetchProductsAPI);
        yield put(SET_PRODUCTS(result.data));
    } catch (e) {
        yield put({ type: "PRODUCTS_FETCH_FAILED" });
    }
}

export default function* productsWatcher() {
    yield takeEvery(types.FETCH_PRODUCTS, getProducts);
}