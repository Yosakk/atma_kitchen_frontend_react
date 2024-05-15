// import { CreateAsyncThunk, createSlice } from "react-redux/toolkit";

// export const getProducts = CreateAsyncThunk("getProducts", async (arg) => {
//   const result = await fetch("http://fakestoreapi.com/product?limit=10").then(
//     (res) => res.json()
//   );
//   return result;
// });

// const products = createSlice({
//     name: "products",
//     initialState:{
//         products: [],
//         cart:[],
//         loading:false,
//         error:null,
//     },
//     reducers:{},
//     extraReducers:(builder)=>{
//         builder.addCase(getProducts.fulfilled,(state,action)=>{
//             state.products=action.payload;
//         })
//     }
// })

// export default products.reducers