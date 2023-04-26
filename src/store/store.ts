import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import createSagaMiddleware from "redux-saga";
import products from './reducers/products'
import { rootSaga } from './sagas/root-saga';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: {
        products,
    },
    middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export default store
export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;