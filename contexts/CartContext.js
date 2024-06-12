import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useReducer } from "react";

export const CartContext = createContext();

const INIT_STATE = {
  cart: null,
  count: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "GET_PRODUCTS":
      return { ...state, cart: action.payload };
    default:
      return state;
  }
}

export default function CartContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  async function getCart() {
    let fromStorage = await AsyncStorage.getItem("cart");
    let cart = JSON.parse(fromStorage);

    if (!cart) {
      cart = {
        products: [],
        totalPrice: 0,
      };
    }
    cart.totalPrice = cart.products.reduce((sum, item) => sum + item.newPrice, 0);

    dispatch({
      type: "GET_PRODUCTS",
      payload: cart,
    });
  }

  async function addProductToCart(product) {
    let cart = JSON.parse(await AsyncStorage.getItem("cart"));
    if (!cart) {
      cart = {
        products: [],
        totalPrice: 0,
      };
    }
    let newProduct = {
      product: product,
      count: 1,
      newPrice: product.price,
    };

    let isInCart = cart.products.some((item) => item.product.id === product.id);

    if (isInCart) {
      cart.products = cart.products.filter((item) => item.product.id !== product.id);
    } else {
      cart.products.push(newProduct);
    }

    cart.totalPrice = cart.products.reduce((sum, item) => sum + item.newPrice, 0);
    await AsyncStorage.setItem("cart", JSON.stringify(cart));
    getCart();
  }

  async function checkProductInCart(product) {
    let cart = JSON.parse(await AsyncStorage.getItem("cart"));
    if (!cart) {
      cart = {
        products: [],
        totalPrice: 0,
      };
    }

    let isInCart = cart.products.some((item) => item.product.id === product.id);

    return isInCart;
  }

  async function deleteProduct(id) {
    let cart = JSON.parse(await AsyncStorage.getItem("cart"));
    cart.products = cart.products.filter((item) => item.product.id !== id);

    await AsyncStorage.setItem("cart", JSON.stringify(cart));
    getCart();
  }

  async function changeProductCount(newCount, id) {
    let cart = JSON.parse(await AsyncStorage.getItem("cart"));
    if (newCount <= 0) {
      newCount = 1;
    }

    cart.products = cart.products.map((item) => {
      if (item.product.id === id) {
        item.count = newCount;
        item.newPrice = item.product.price * newCount;
      }
      return item;
    });

    await AsyncStorage.setItem("cart", JSON.stringify(cart));
    getCart();
  }

  return (
    <CartContext.Provider
      value={{ cart: state.cart, count: state.count, getCart, addProductToCart, checkProductInCart, deleteProduct, changeProductCount }}
    >
      {children}
    </CartContext.Provider>
  );
}
