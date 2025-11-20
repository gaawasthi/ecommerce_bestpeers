// GET /api/dashboard/seller/total
// GET /api/dashboard/seller/low
// GET /api/dashboard/seller/del

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getSellerTotalRevenue = createAsyncThunk(
  'seller/getSellerTotalRevenue',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get('/api/dashboard/seller/total');
      return res.data; 
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || error.message || 'Error'
      );
    }
  }
);

export const getlowStockProducts = createAsyncThunk(
  'seller/lowStockProducts',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get('/api/dashboard/seller/low');
      return res.data.lowStockProducts; 
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || error.message || 'Error'
      );
    }
  }
);

export const getpendingOrders = createAsyncThunk(
  'seller/pendingOrders',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get('/api/dashboard/seller/pen');
      return res.data.pendingOrders;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || error.message || 'Error'
      );
    }
  }
);

export const getdeliverdOrders = createAsyncThunk(
  'seller/deliverdOrders',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get('/api/dashboard/seller/del');
      return res.data.delivered; 
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || error.message || 'Error'
      );
    }
  }
);

const initialState = {
  total: 0,
  lowStock: [],
  pendingOrders: [],
  deliverdOrders: [],
  isLoading: false,
  error: null,
};

const sellerSlice = createSlice({
  name: 'seller',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
  
      .addCase(getSellerTotalRevenue.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getSellerTotalRevenue.fulfilled, (state, action) => {
        state.isLoading = false;
        state.total = action.payload.totalRevenue;
      })
      .addCase(getSellerTotalRevenue.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

   
      .addCase(getlowStockProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getlowStockProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.lowStock = action.payload;
      })
      .addCase(getlowStockProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(getpendingOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getpendingOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.pendingOrders = action.payload;
      })
      .addCase(getpendingOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(getdeliverdOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getdeliverdOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.deliverdOrders = action.payload;
      })
      .addCase(getdeliverdOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default sellerSlice.reducer;
