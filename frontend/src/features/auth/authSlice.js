import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const user = JSON.parse(localStorage.getItem('user'));

 const baseUrl = import.meta.env.VITE_API_URL


const initialState = {
  user: user || null,

  isLoading: false,
  isError: false,
};

const getErrorMessage = (error) =>
  error?.response?.data?.message || error.message || 'Something went wrong';

export const register = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${baseUrl}/api/users/register`, userData , { withCredentials: true });
      return res.data;
    } catch (err) {
      return rejectWithValue(getErrorMessage(err));
    }
  }
);

export const resendOtp = createAsyncThunk(
  'auth/resendOtp',
  async ({ email }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${baseUrl}/api/users/resendOtp`, { email } , { withCredentials: true });
      return res.data;
    } catch (err) {
      return rejectWithValue(getErrorMessage(err));
    }
  }
);

export const verify = createAsyncThunk(
  'auth/verify',
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${baseUrl}/api/users/verify`, { email, otp } ,{ withCredentials: true });

      if (res.data) localStorage.setItem('user', JSON.stringify(res.data));

      return res.data;
    } catch (err) {
      return rejectWithValue(getErrorMessage(err));
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (userData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${baseUrl}/api/users/login`, userData ,{ withCredentials: true });

      if (res.data) localStorage.setItem('user', JSON.stringify(res.data));

      return res.data;
    } catch (err) {
      return rejectWithValue(getErrorMessage(err));
    }
  }
);

export const logoutApi = createAsyncThunk(
  'auth/logoutApi',
  async (_, { rejectWithValue }) => {
    try {
      await axios.post(`${baseUrl}/api/users/logout`, {}, { withCredentials: true });

      localStorage.removeItem('user');

      document.cookie.split(';').forEach((cookie) => {
        document.cookie =
          cookie.trim().split('=')[0] +
          '=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;';
      });

      return true;
    } catch (err) {
      return rejectWithValue(getErrorMessage(err));
    }
  }
);

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (userData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${baseUrl}/api/users/reset`, userData , { withCredentials: true });
      return res.data;
    } catch (err) {
      return rejectWithValue(getErrorMessage(err));
    }
  }
);

export const resetPasswordVerify = createAsyncThunk(
  'auth/resetPasswordVerify',
  async (userData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${baseUrl}/api/users/reset/password`, userData , { withCredentials: true });
      return res.data;
    } catch (err) {
      return rejectWithValue(getErrorMessage(err));
    }
  }
);

export const changePassword = createAsyncThunk(
  'auth/changePassword',
  async (userData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${baseUrl}/api/users/password/change`, userData ,{ withCredentials: true });
      return res.data;
    } catch (err) {
      return rejectWithValue(getErrorMessage(err));
    }
  }
);

export const userInfo = createAsyncThunk(
  'auth/userInfo',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${baseUrl}/api/users/me` , { withCredentials: true });
      return res.data;
    } catch (err) {
      return rejectWithValue(getErrorMessage(err));
    }
  }
);

export const updateUser = createAsyncThunk(
  'auth/updateUser',
  async (userData, { rejectWithValue }) => {
    try {
      const { id, ...body } = userData;
      const res = await axios.put(`${baseUrl}/api/users/${id}`, body ,{ withCredentials: true } );

      if (res.data) localStorage.setItem('user', JSON.stringify(res.data));
      console.log(res);

      return res.data;
    } catch (err) {
      return rejectWithValue(getErrorMessage(err));
    }
  }
);


const authSlice = createSlice({
  name: 'auth',
  initialState,

  extraReducers: (builder) => {
    builder

      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(register.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(register.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(resendOtp.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(resendOtp.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(resendOtp.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(verify.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(verify.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(verify.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.user = null;
      })

      .addCase(logoutApi.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutApi.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
      })
      .addCase(logoutApi.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(resetPassword.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(resetPasswordVerify.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(resetPasswordVerify.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(resetPasswordVerify.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(changePassword.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(changePassword.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(userInfo.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(userInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
      })
      .addCase(userInfo.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
      })
      .addCase(updateUser.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
   
      
      
      ;
  },
});

export default authSlice.reducer;
