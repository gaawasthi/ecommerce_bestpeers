import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';


const getErrorMessage = (error) =>
  error?.response?.data?.message || error.message || 'Error';

export const getAllProducts = createAsyncThunk(
  'products/getAllProducts',
  async (filters = {}, { rejectWithValue }) => {
    try {
      const res = await axios.get('/api/products', {
        params: filters,   
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);
export const searched = createAsyncThunk(
  'products/searched',
  async (query, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/api/products/search?query=${query}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);


export const getFashionProducts = createAsyncThunk(
  'products/getFashionProducts',
  async (filters = {}, { rejectWithValue }) => {
    try {
      const res = await axios.get('/api/products', {
        params: filters,   
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);
export const getElectronicsProducts = createAsyncThunk(
  'products/getElectronicsProducts',
  async (filters = {}, { rejectWithValue }) => {
    try {
      const res = await axios.get('/api/products', {
        params: filters,   
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);
export const getSports = createAsyncThunk(
  'products/getSports',
  async (filters = {}, { rejectWithValue }) => {
    try {
      const res = await axios.get('/api/products', {
        params: filters,   
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

export const getMyProducts = createAsyncThunk(
  'products/getMyProducts',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get('/api/products/my/products');
      return res.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

export const getSingleProduct = createAsyncThunk(
  'products/getSingleProduct',
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/api/products/${id}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

export const addProduct = createAsyncThunk(
  'products/addProduct',
  async (productData, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      Object.entries(productData).forEach(([key, value]) => {
        if (key === "images") {
          value.forEach((file) => formData.append("images", file));
        } else {
          formData.append(key, value);
        }
      });

      const res = await axios.post('/api/products/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
return res.data.product;   

    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);


export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async ({ id, productData }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`/api/products/${id}`, productData);
      return res.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`/api/products/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

const initialState = {
  products: [],
  searchedProducts  : [],
  electronics:[] , 
  fashion : [] , 
  sports:[],
  product: null,
  isLoading: false,
  error: null,
  page: 0,
  totalPages: 0,
  totalProduct: 0,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
   
 
  },
  extraReducers: (builder) => {
    builder
    
      .addCase(getAllProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload.products;
        state.page = action.payload.page;
        state.totalPages = action.payload.totalPages;
        state.totalProduct = action.payload.totalProduct;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(searched.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(searched.fulfilled, (state, action) => {
        state.isLoading = false;
        state.searchedProducts = action.payload.products;

      })
      .addCase(searched.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getElectronicsProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getElectronicsProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.electronics = action.payload.products;
        state.page = action.payload.page;
        state.totalPages = action.payload.totalPages;
        state.totalProduct = action.payload.totalProduct;
      })
      .addCase(getElectronicsProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
   
      .addCase(getFashionProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getFashionProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.fashion = action.payload.products;
        state.page = action.payload.page;
        state.totalPages = action.payload.totalPages;
        state.totalProduct = action.payload.totalProduct;
      })
      .addCase(getFashionProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
   
      .addCase(getSports.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getSports.fulfilled, (state, action) => {
        state.isLoading = false;
        state.sports = action.payload.products;
        state.page = action.payload.page;
        state.totalPages = action.payload.totalPages;
        state.totalProduct = action.payload.totalProduct;
      })
      .addCase(getSports.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
   
      .addCase(getMyProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getMyProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload.products;
      })
      .addCase(getMyProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      
      .addCase(getSingleProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getSingleProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.product = action.payload.product;
      })
      .addCase(getSingleProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

 
      .addCase(addProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.isLoading = false;
       state.products.push(action.payload);

      })
      .addCase(addProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.product = action.payload;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = state.products.filter(
          (p) => p._id !== action.payload
        );
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearProduct, clearError } = productSlice.actions;
export default productSlice.reducer;
