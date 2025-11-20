import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async ({ productId, quantity = 1 }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        '/api/cart/add',
        { productId, quantity },
        { withCredentials: true }
      );
      return res.data.cart;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to add item'
      );
    }
  }
);

export const getCart = createAsyncThunk(
  'cart/getCart',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get('/api/cart', { withCredentials: true });

      return res.data.cart;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to fetch cart'
      );
    }
  }
);

export const updateCartItem = createAsyncThunk(
  'cart/updateCartItem',
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const res = await axios.put(
        '/api/cart/update',
        { productId, quantity },
        { withCredentials: true }
      );
      return res.data.cart;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to update cart'
      );
    }
  }
);

export const removeCartItem = createAsyncThunk(
  'cart/removeCartItem',
  async (productId, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`/api/cart/remove/${productId}`, {
        withCredentials: true,
      });
      return res.data.cart;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'failed to remove item'
      );
    }
  }
);
//empty__
export const emptyCart = createAsyncThunk(
  'cart/emptyCart',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.put(`/api/cart/empty`);
    } catch (error) {
      return rejectWithValue(
        err.response?.data?.message || 'failed to remove item'
      );
    }
  }
);
const initialState = {
  cart: null,
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        state.error = '';
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        state.error = '';
      })
      .addCase(getCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(emptyCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      });
  },
});

export default cartSlice.reducer;
