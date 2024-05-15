import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getProducts = createAsyncThunk("getProducts", async (arg) => {
  const result = await fetch("http://fakestoreapi.com/products?limit=10").then(
    (res) => res.json()
  );
  return result;
});

const products = createSlice({
  name: "products",
  initialState: {
    products: [],
    cart: [],
    loading: false,
    error: null,
  },
  reducers: {
    addToCart: (state, action) => {
      let olditems = state.cart.filter((val) => val.id !== action.payload)
      let newitems = state.cart.filter((val) => val.id !== action.payload)
      let newQty = newitems.length?newitems[0]?.qty+1:1 
      newitems.length?newitems[0]={...action.payload,qty:newQty}:newitems=[{...action.payload,qty:newQty}]
      olditems.push(newitems[0])
      state.cart=olditems
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.products = action.payload;
    });
  },
});
export const {addToCart} = products.actions
export default products.reducers
