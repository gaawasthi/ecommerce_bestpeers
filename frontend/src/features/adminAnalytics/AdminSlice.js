import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const baseUrl = import.meta.env.VITE_API_URL;
const getErrorMessage = (error) => {
  return (
    error?.response?.data?.message || error?.message || 'something went wrong'
  );
};

export const getTotalRevenue = createAsyncThunk(
  'admin/getTotalRevenue',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${baseUrl}/api/dashboard/admin/total`, {
        withCredentials: true,
      });
      console.log(res.data);

      return res.data.totalRevenue;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// admin add seller

export const adminCreateSeller = createAsyncThunk(
  'auth/adminCreateSeller',
  async (userData, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${baseUrl}/api/users/create/seller`,
        userData,
        { withCredentials: true }
      );
      return res.data.newUser;
    } catch (error) {
      return rejectWithValue(getErrorMessage(err));
    }
  }
);
export const lastWeek = createAsyncThunk(
  'admin/lastWeek',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${baseUrl}/api/dashboard/admin/week`, {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

export const topCustomers = createAsyncThunk(
  'admin/topCustomers',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${baseUrl}/api/dashboard/admin/customer/top`,
        { withCredentials: true }
      );
      return res.data.topCustomers;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

export const topProducts = createAsyncThunk(
  'admin/topProducts',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${baseUrl}/api/dashboard/admin/product/top`,
        { withCredentials: true }
      );
      // console.log(res.data.topProducts);

      return res.data.topProducts;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

export const topSellers = createAsyncThunk(
  'admin/topSellers',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${baseUrl}/api/dashboard/admin/seller/top`, {
        withCredentials: true,
      });
      return res.data.topSellers;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

export const allUsers = createAsyncThunk(
  'admin/users',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${baseUrl}/api/users`, {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

export const singleUser = createAsyncThunk(
  'admin/singleUser',
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${baseUrl}/api/users/${id}`, {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);
export const deleteUser = createAsyncThunk(
  'admin/deleteUser',
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`${baseUrl}/api/users/${id}`, {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    revenue: 0,
    weekData: {},
    users: [],
    user: null,
    customersData: [],
    productsData: [],
    sellersData: [],
    isLoading: false,
    error: null,
    newSeller: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTotalRevenue.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getTotalRevenue.fulfilled, (state, action) => {
        state.isLoading = false;
        state.revenue = action.payload;
      })
      .addCase(getTotalRevenue.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
    builder
      .addCase(lastWeek.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(lastWeek.fulfilled, (state, action) => {
        state.isLoading = false;
        state.weekData = action.payload;
      })
      .addCase(lastWeek.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
    builder
      .addCase(topCustomers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(topCustomers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.customersData = action.payload;
      })
      .addCase(topCustomers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
    builder
      .addCase(topProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(topProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productsData = action.payload;
      })
      .addCase(topProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
    builder
      .addCase(topSellers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(topSellers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.sellersData = action.payload;
      })
      .addCase(topSellers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(allUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(allUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload.users;
      })
      .addCase(allUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(singleUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(singleUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(singleUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.sellersData = action.payload;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(adminCreateSeller.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(adminCreateSeller.fulfilled, (state, action) => {
        state.isLoading = false;
        action.newSeller = action.payload;
        state.users.push(action.payload);
      })
      .addCase(adminCreateSeller.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      });
  },
});

export default adminSlice.reducer;
