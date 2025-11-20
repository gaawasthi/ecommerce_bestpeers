import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
const baseUrl = import.meta.env.VITE_API_URL;
export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (orderData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${baseUrl}/api/order/create`,
        orderData,
        { withCredentials: true }
      );
      return data.order;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || 'Error');
    }
  }
);

export const getUserOrders = createAsyncThunk(
  'order/getUserOrders',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${baseUrl}/api/order/orders`, {
        withCredentials: true,
      });
      return data.orders;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || 'Error');
    }
  }
);

export const getAdminOrders = createAsyncThunk(
  'order/getAdminOrders',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${baseUrl}/api/order/all`, {
        withCredentials: true,
      });
      // console.log(data);

      return data.orders;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || 'Error');
    }
  }
);

export const getOrderById = createAsyncThunk(
  'order/getOrderById',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${baseUrl}/api/orders/single/${id}`, {
        withCredentials: true,
      });
      return data.order;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || 'Error');
    }
  }
);

// customer

export const cancelOrder = createAsyncThunk(
  'order/cancelOrder',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${baseUrl}/api/order/orders/cancel/${id}`,
        { withCredentials: true }
      );
      return data.updatedOrder;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || 'Error');
    }
  }
);
// seller --
export const updateOrder = createAsyncThunk(
  'order/updateOrder',
  async ({ id, updateData }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `${baseUrl}/api/order/orders/update/${id}`,
        { status: updateData },
        { withCredentials: true }
      );

      return data.order;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || 'Error');
    }
  }
);
//seller/orders
export const sellerOrder = createAsyncThunk(
  'order/sellerOrder',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${baseUrl}/api/order/seller/orders`, {
        withCredentials: true,
      });
      console.log(res.data);
      return res.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || 'Error');
    }
  }
);

const initialState = {
  userOrders: [],
  adminOrders: [],
  sellersOrders: [],
  orderDetails: null,
  createdOrder: JSON.parse(localStorage.getItem('lastOrder')) || null,
  isLoading: false,
  error: null,
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.createdOrder = action.payload;
        localStorage.setItem('lastOrder', JSON.stringify(action.payload));
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(getUserOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userOrders = action.payload;
      })
      .addCase(getUserOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(getAdminOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAdminOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.adminOrders = action.payload;
      })
      .addCase(getAdminOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(getOrderById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getOrderById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action.payload;
      })
      .addCase(getOrderById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(cancelOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(cancelOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action.payload;
      })
      .addCase(cancelOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(updateOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action.payload;
      })
      .addCase(updateOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(sellerOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(sellerOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.sellersOrders = action.payload.orders;
      })
      .addCase(sellerOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default orderSlice.reducer;
