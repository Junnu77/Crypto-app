import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchCoin, fetchSearchCoins, fetchTickerCoins, fetchTrendingCoins } from "./coinService";

const coinSlice = createSlice({
    name:"coins",
    initialState:{
        coins:[],
        trendingCoins: [],
        coin:null,
        tickerCoins:[],
        isLoading:false,
        isSuccess:false,
        isError:false,
        message:"",
    },
    reducers:{
        coinReset : (state,action) => {
            return {
                ...state,
                coin :null 
            }
        }
    },
    extraReducers:builder=>{
        builder
        .addCase(getTrendingCoins.pending, (state, action)=>{
            state.isLoading = true;
            state.isSuccess = false;
            state.isError = false;
        })
        .addCase(getTrendingCoins.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.trendingCoins = action.payload;
            state.isError = false;
        })
        .addCase(getTrendingCoins.rejected, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(getSearchCoins.pending, (state, action)=>{
            state.isLoading = true;
            state.isSuccess = false;
            state.isError = false;
        })
        .addCase(getSearchCoins.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.coins = action.payload;
            state.isError = false;
        })
        .addCase(getSearchCoins.rejected, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(getCoin.pending, (state, action)=>{
            state.isLoading = true;
            state.isSuccess = false;
            state.isError = false;
        })
        .addCase(getCoin.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.coin = action.payload;
            state.isError = false;
        })
        .addCase(getCoin.rejected, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(getTickerCoins.pending, (state, action)=>{
            state.isLoading = true;
            state.isSuccess = false;
            state.isError = false;
        })
        .addCase(getTickerCoins.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.tickerCoins = action.payload;
            state.isError = false;
        })
        .addCase(getTickerCoins.rejected, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = action.payload;
        })
    }
})
export const {coinReset} = coinSlice.actions;
export default coinSlice.reducer


export const getTrendingCoins = createAsyncThunk("FETCH/TRENDING", async()=>{
    try {
        return await fetchTrendingCoins();
    } catch (error) {
        console.log(error)
    }
})

export const getSearchCoins = createAsyncThunk("FETCH/SEARCH", async(query)=>{
    try {
        return await fetchSearchCoins(query);
    } catch (error) {
        console.log(error)
    }
})

export const getCoin = createAsyncThunk("FETCH/COIN", async(id)=>{
    try {
        return await fetchCoin(id);
    } catch (error) {
        console.log(error)
    }
})
export const getTickerCoins = createAsyncThunk("FETCH/TICKERCOIN", async()=>{
    try {
        return await fetchTickerCoins();
    } catch (error) {
        console.log(error)
    }
})