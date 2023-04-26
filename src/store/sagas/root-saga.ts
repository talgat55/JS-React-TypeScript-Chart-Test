import { all, fork } from 'redux-saga/effects';
import productsWatcher from "./products"

export const rootSaga = function* root() {
    yield all([fork(productsWatcher)]);
}