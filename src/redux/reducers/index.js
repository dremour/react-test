import {
  FETCH_PRODUCTS_SUCCESS,
  CHANGE_CATEGORY,
  FILTER_GOODS
} from "../constants/action-types";

const initialState = {
  isLoaded: false,
  searchInput: "",
  currentCategory: "",
  goods: [],
  filteredByCategory: [],
  filteredList: [],
  goodsCategories: []
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PRODUCTS_SUCCESS:
      let categories = action.payload.products.map(item => item.bsr_category);
      let filteredCategories = [];
      for (let item of categories) {
        if (filteredCategories.indexOf(item) === -1) {
          filteredCategories.push(item);
        }
      }
      return {
        ...state,
        isLoaded: true,
        goods: action.payload.products,
        goodsCategories: ["All", ...filteredCategories]
      };

    case CHANGE_CATEGORY:
      const currentCategory = action.category.split(" ").join("");
      let { goods } = state;
      let filteredByCategoryList =
        currentCategory !== "All"
          ? goods.filter(
              item => item.bsr_category.split(" ").join("") === currentCategory
            )
          : goods;
      return {
        ...state,
        currentCategory,
        filteredByCategory: filteredByCategoryList,
        filteredList: filteredByCategoryList,
        searchInput: ""
      };

    case FILTER_GOODS:
      let oldGoods =
        state.currentCategory === "All"
          ? state.goods
          : state.filteredByCategory;
      const { value } = action;
      let filteredByNameList = oldGoods.filter(
        item => item.brand.toLowerCase().search(value.toLowerCase()) !== -1
      );
      return {
        ...state,
        filteredList: filteredByNameList,
        searchInput: value
      };

    default:
      return state;
  }
}

export default rootReducer;