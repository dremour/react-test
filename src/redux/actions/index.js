import {
  GET_PRODUCTS,
  FILTER_BY_CATEGORY,
  FILTER_BY_NAME
} from "../constants/action-types";

export const getProducts = (category, name) => ({
  type: GET_PRODUCTS,
  currentCategory: category,
  searchInput: name
});

export const filterByCategory = category => ({
  type: FILTER_BY_CATEGORY,
  category
});

export const filterByName = value => ({
  type: FILTER_BY_NAME,
  value
});
