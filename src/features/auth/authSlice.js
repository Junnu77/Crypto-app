import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { login, register } from "./authService";

const userExist = JSON.parse(localStorage.getItem("user"));

const authSlice = createSlice({
    name:"auth",
    initialState:{
        user:userExist || null,
        isLoading:false,
        isSuccess:false,
        isError:false,
        message:"",
    },
    reducers:{},
    extraReducers:builder=>{
        builder
        .addCase(registerUser.pending, (state,action)=>{
            state.isLoading = true;
            state.isError = false;
            state.isSuccess = false;
        })
        .addCase(registerUser.fulfilled, (state,action)=>{
            state.isLoading = false;
            state.isError = false;
            state.user = action.payload;
            state.isSuccess = true;
        })
        .addCase(registerUser.rejected, (state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.payload;
        })
        .addCase(loginUser.pending, (state,action)=>{
            state.isLoading = true;
            state.isError = false;
            state.isSuccess = false;
        })
        .addCase(loginUser.fulfilled, (state,action)=>{
            state.isLoading = false;
            state.isError = false;
            state.user = action.payload;
            state.isSuccess = true;
        })
        .addCase(loginUser.rejected, (state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.payload;
        })
        .addCase(logOutUser.fulfilled, (state,action)=>{
            state.isLoading = false;
            state.isError = false;
            state.user = null;
            state.isSuccess = false;
        })
    }
})

export default authSlice.reducer;

export const registerUser = createAsyncThunk('REGISTER/USER',async (userData, thunkAPI) => {
    try {
        return await register(userData);
    } catch (error) {
        const message = error.response.data.message
        return thunkAPI.rejectWithValue(message);
    }
})
export const loginUser = createAsyncThunk('LOGIN/USER',async (userData, thunkAPI) => {
    try {
        return await login(userData);
    } catch (error) {
        const message = error.response.data.message
        return thunkAPI.rejectWithValue(message);
    }
})

export const logOutUser = createAsyncThunk('LOGOUT/USER', async()=>{
    localStorage.removeItem('user');
})