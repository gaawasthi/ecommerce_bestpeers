import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = import.meta.env.VITE_API_URL;

const axiosConfig = {
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
};


export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${baseUrl}/api/order/create`,
        orderData,
        axiosConfig
      );
      return data.order;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to place order");
    }
  }
);

export const getUserOrders = createAsyncThunk(
  "order/getUserOrders",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${baseUrl}/api/order/orders`,
        axiosConfig
      );
      return data.orders;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to load orders");
    }
  }
);

export const getAdminOrders = createAsyncThunk(
  "order/getAdminOrders",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${baseUrl}/api/order/all`,
        axiosConfig
      );
      return data.orders;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to load admin orders");
    }
  }
);

export const getOrderById = createAsyncThunk(
  "order/getOrderById",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${baseUrl}/api/orders/single/${id}`,
        axiosConfig
      );
      return data.order;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Order not found");
    }
  }
);

export const cancelOrder = createAsyncThunk(
  "order/cancelOrder",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `${baseUrl}/api/order/orders/cancel/${id}`,
        {},
        axiosConfig
      );
      return data.updatedOrder;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to cancel order");
    }
  }
);

export const updateOrder = createAsyncThunk(
  "order/updateOrder",
  async ({ id, updateData }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `${baseUrl}/api/order/orders/update/${id}`,
        { status: updateData },
        axiosConfig
      );
      return data.order;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to update order");
    }
  }
);

export const sellerOrder = createAsyncThunk(
  "order/sellerOrder",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${baseUrl}/api/order/seller/orders`,
        axiosConfig
      );
      return data.orders;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to load seller orders");
    }
  }
);


const initialState = {
  userOrders: [],
  adminOrders: [],
  sellersOrders: [],
  orderDetails: null,
  createdOrder: JSON.parse(localStorage.getItem("lastOrder")) || null,

  createLoading: false,
  listLoading: false,
  updateLoading: false,
  cancelLoading: false,
  sellerLoading: false,
  detailsLoading: false,

  error: null,
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    clearLastOrder: (state) => {
      state.createdOrder = null;
      localStorage.removeItem("lastOrder");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.createLoading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.createLoading = false;
        state.createdOrder = action.payload;
        localStorage.setItem("lastOrder", JSON.stringify(action.payload));
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.createLoading = false;
        state.error = action.payload;
      })

      .addCase(getUserOrders.pending, (state) => {
        state.listLoading = true;
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.listLoading = false;
        state.userOrders = action.payload;
      })
      .addCase(getUserOrders.rejected, (state, action) => {
        state.listLoading = false;
        state.error = action.payload;
      })

      .addCase(getAdminOrders.pending, (state) => {
        state.listLoading = true;
      })
      .addCase(getAdminOrders.fulfilled, (state, action) => {
        state.listLoading = false;
        state.adminOrders = action.payload;
      })
      .addCase(getAdminOrders.rejected, (state, action) => {
        state.listLoading = false;
        state.error = action.payload;
      })

      .addCase(getOrderById.pending, (state) => {
        state.detailsLoading = true;
      })
      .addCase(getOrderById.fulfilled, (state, action) => {
        state.detailsLoading = false;
        state.orderDetails = action.payload;
      })
      .addCase(getOrderById.rejected, (state, action) => {
        state.detailsLoading = false;
        state.error = action.payload;
      })

      .addCase(cancelOrder.pending, (state) => {
        state.cancelLoading = true;
      })
      .addCase(cancelOrder.fulfilled, (state, action) => {
        state.cancelLoading = false;
        state.orderDetails = action.payload;
      })
      .addCase(cancelOrder.rejected, (state, action) => {
        state.cancelLoading = false;
        state.error = action.payload;
      })

      .addCase(updateOrder.pending, (state) => {
        state.updateLoading = true;
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        state.updateLoading = false;
        state.orderDetails = action.payload;
      })
      .addCase(updateOrder.rejected, (state, action) => {
        state.updateLoading = false;
        state.error = action.payload;
      })


      .addCase(sellerOrder.pending, (state) => {
        state.sellerLoading = true;
      })
      .addCase(sellerOrder.fulfilled, (state, action) => {
        state.sellerLoading = false;
        state.sellersOrders = action.payload;
      })
      .addCase(sellerOrder.rejected, (state, action) => {
        state.sellerLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearLastOrder } = orderSlice.actions;
export default orderSlice.reducer;
