import {
  FETCH_PRODUCTS_SUCCESS,
  CHANGE_CATEGORY,
  FILTER_GOODS
} from "../constants/action-types";

export function fetchProducts(category, name) {
  return dispatch => {
    return fetch("https://demo3907346.mockable.io/products")
      .then(res => res.json())
      .then(json => {
        dispatch(fetchProductsSuccess(json.products));
        dispatch(changeCategory(category));
        dispatch(filterGoods(name));
        return json.products;
      });
  };
}

export const fetchProductsSuccess = products => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: { products }
});

export const changeCategory = category => ({
  type: CHANGE_CATEGORY,
  category
});

export const filterGoods = value => {
  return {
    type: FILTER_GOODS,
    value
  };
};
