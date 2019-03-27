import {
  GET_PRODUCTS,
  CHANGE_CATEGORY,
  FILTER_GOODS
} from "../constants/action-types";

export const getProducts = (category, name) => {
  return {
    type: GET_PRODUCTS,
    currentCategory: category,
    searchInput: name
  };
};

export const changeCategory = category => ({
  type: CHANGE_CATEGORY,
  category
});

export const filterGoods = value => ({
  type: FILTER_GOODS,
  value
});
