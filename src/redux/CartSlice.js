

import { createSlice } from "@reduxjs/toolkit";

const storeInLocalStorage = (data) => {
  localStorage.setItem("cart", JSON.stringify(data));
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    data: [],
    totalItems: 0,
    totalAmount: 0,
    deliverCharge: 10,
    isAuthenticated: false, 
  },
  reducers: {
    addToCart(state, action) {
      const existingProductIndex = state.data.findIndex(
        (product) => product.id === action.payload.id
      );

      if (existingProductIndex !== -1) {
        
        const existingProduct = state.data[existingProductIndex];
        const newQuantity = existingProduct.quantity + action.payload.quantity;
        const newTotalPrice = newQuantity * existingProduct.price;

        const updatedProduct = {
          ...existingProduct,
          quantity: newQuantity,
          totalPrice: newTotalPrice,
        };

        const updatedData = [...state.data];
        updatedData[existingProductIndex] = updatedProduct;

        state.data = updatedData;
      } else {
        
        state.data.push(action.payload);
      }
      
      storeInLocalStorage(state.data);
    },

    updateQuantity(state, action) {
      const { id, quantity } = action.payload;
      const productToUpdate = state.data.find((product) => product.id === id);

      if (productToUpdate) {
        const validQuantity = Math.max(quantity || 1, 1);
        productToUpdate.quantity = validQuantity;
        productToUpdate.totalPrice = productToUpdate.price * quantity;
      }
    },

    removeItem(state, action) {
      const tempCart = state.data.filter(
        (product) => product.id !== action.payload.id
      );
      state.data = tempCart;
      storeInLocalStorage(state.data);
    },
    
    getCartTotal(state) {
      state.totalAmount = state.data.reduce((cartTotal, cartItem) => {
        return (cartTotal += cartItem.totalPrice);
      }, 0);
      state.totalItems = state.data.length;
    },

    logoutUser(state) {
      state.isAuthenticated = false;
      localStorage.removeItem("name");
      localStorage.removeItem("email");
      localStorage.removeItem("password");
      localStorage.removeItem("signUp");
    },
  },
});

export const { addToCart, removeItem, getCartTotal, updateQuantity, logoutUser } =
  cartSlice.actions;
export default cartSlice.reducer;
