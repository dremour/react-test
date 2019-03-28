import { put, takeEvery, all } from "redux-saga/effects";
import {
  GET_PRODUCTS,
  PRODUCTS_RECEIVED,
  FILTER_BY_CATEGORY,
  FILTER_BY_NAME
} from "../constants/action-types";

function* actionWatcher() {
  yield takeEvery(GET_PRODUCTS, fetchProducts);
}

function* fetchProducts(action) {
  const json = yield fetch("https://demo3907346.mockable.io/products").then(
    response => response.json()
  );
  yield put({ type: PRODUCTS_RECEIVED, products: json.products });
  yield put({ type: FILTER_BY_CATEGORY, category: action.currentCategory });
  yield put({ type: FILTER_BY_NAME, value: action.searchInput });
}

export default function* rootSaga() {
  yield all([actionWatcher()]);
}
