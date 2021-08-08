import PRODUCTS from "../../data/dummy-data";
import product from "../../models/product";
import {
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  UPDATE_PRODUCT,
} from "../actions/products";

const initialState = {
  avaliableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter((prod) => prod.ownerId === "u1"),
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DELETE_PRODUCT:
      return {
        ...state,
        userProducts: state.userProducts.filter(
          (product) => product.id !== action.pid
        ),
        avaliableProducts: state.userProducts.filter(
          (product) => product.id !== action.pid
        ),
      };

    case CREATE_PRODUCT:
      const newProduct = new product(
        new Date().toString(),
        "u1",
        action.productData.initialState,
        action.productData.imageUrl,
        action.productData.description,
        action.productData.price
      );

      return {
        ...state,
        avaliableProducts: state.avaliableProducts.concat(newProduct),
        userProducts: state.userProducts.concat(newProduct),
      };

    case UPDATE_PRODUCT:
      const productIndex = state.userProducts.findIndex(
        (prod) => prod.id === action.pid
      );

      const updatedProduct = new product(
        action.pid,
        state.userProducts[productIndex].ownerId,
        action.productData.title,
        action.productData.imageUrl,
        action.productData.description,
        state.userProducts[productIndex].price
      );

      const updatedUserProducts = [...state.userProducts];
      updatedUserProducts[productIndex] = updatedProduct;
      const availableProductIndex = state.avaliableProducts.findIndex(
        (prod) => prod.id === action.pid
      );

      const updatedAvailableProducts = [...state.avaliableProducts];
      updatedAvailableProducts[availableProductIndex] = updatedProduct;

      return {
        ...state,
        avaliableProducts: updatedAvailableProducts,
        userProducts: updatedUserProducts,
      };
  }
  return state;
};
