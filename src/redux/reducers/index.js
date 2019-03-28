import {
  GET_PRODUCTS,
  FILTER_BY_CATEGORY,
  FILTER_BY_NAME,
  PRODUCTS_RECEIVED
} from "../constants/action-types";

const initialState = {
  isLoaded: false,
  searchInputValue: "",
  currentCategory: "",
  receivedGoods: [],
  filteredByCategory: [],
  filteredByName: [],
  goodsCategories: []
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        isLoaded: false
      };

    case PRODUCTS_RECEIVED:
      let { products } = action;
      let categories = products.map(item => item.bsr_category);
      let filteredCategories = [];
      for (let item of categories) {
        if (filteredCategories.indexOf(item) === -1) {
          filteredCategories.push(item);
        }
      }

      return {
        ...state,
        isLoaded: true,
        receivedGoods: products,
        goodsCategories: ["All", ...filteredCategories]
      };

    case FILTER_BY_CATEGORY:
      const currentCategory = action.category.split(" ").join("");
      let { receivedGoods } = state;
      let filteredByCategoryList =
        currentCategory !== "All"
          ? receivedGoods.filter(
              item => item.bsr_category.split(" ").join("") === currentCategory
            )
          : receivedGoods;
      return {
        ...state,
        currentCategory,
        filteredByCategory: filteredByCategoryList,
        filteredByName: filteredByCategoryList,
        searchInputValue: ""
      };

    case FILTER_BY_NAME:
      let oldGoods =
        state.currentCategory === "All"
          ? state.receivedGoods
          : state.filteredByCategory;
      const { value } = action;
      let filteredByNameList = oldGoods.filter(
        item => item.brand.toLowerCase().search(value.toLowerCase()) !== -1
      );
      return {
        ...state,
        filteredByName: filteredByNameList,
        searchInputValue: value
      };

    default:
      return state;
  }
}

export default rootReducer;
