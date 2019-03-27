import { put, takeEvery, all } from "redux-saga/effects";
import { GET_PRODUCTS, RECEIVED_PRODUCTS } from "../constants/action-types";
import { changeCategory, filterGoods } from "../actions/index";

function* actionWatcher() {
  yield takeEvery(GET_PRODUCTS, fetchProducts);
}

function* fetchProducts(action) {
  const json = yield fetch("https://demo3907346.mockable.io/products").then(
    response => response.json()
  );
  yield put({ type: RECEIVED_PRODUCTS, json: json.products });
  yield put(changeCategory(action.currentCategory));
  yield put(filterGoods(action.searchInput));
}

export default function* rootSaga() {
  yield all([actionWatcher()]);
}
