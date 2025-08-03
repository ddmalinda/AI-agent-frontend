import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setBusinessProducts } from "../products/productsSlice";
import { pagesLinkpath } from "../../path/LinkPath";
import apiClient from "../../util/api";

interface BusinessState {
    businessDetails: BusinessDetails[], // Array of BusinessDetails
    businessFetching: 'notStarted' | 'pending' | 'fulfilled' | 'rejected',
    businessFetchingError: string | null,
}

interface BusinessDetails {
    id: number,
    name: string;
    type: string;
    industry: string;
    description: string;
}

export const fetchBusinessDetails = createAsyncThunk(
    pagesLinkpath.homePage, async (userId: number,{ dispatch }) => {
        try{
            const response = await apiClient.get(`/api/users/${userId}/businesses`);
            console.log(response.data)
            
            if(Array.isArray(response.data)){
                response.data.forEach((business)=>{
                    if(business.products && Array.isArray(business.products)){
                        dispatch(setBusinessProducts({
                            businessId: business.id,
                            products: business.products
                        }));
                    }
                })
            }
            return response.data;
        }catch(error){
            console.log(error)
        }
    })
// Initial State
const initialState: BusinessState = {
    businessDetails: [],
    businessFetching: 'notStarted',
    businessFetchingError: null,
}

const businessSlice = createSlice({
    name: 'business',
    initialState,
    reducers: {
        addBusiness: (state, action) => {
            state.businessDetails.push(action.payload);
        },
        clearBusinessDetails: (state) => {
            state.businessDetails = [];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBusinessDetails.pending, (state) => { 
                state.businessFetching = 'pending';
                state.businessFetchingError = null; 
            })
            .addCase(fetchBusinessDetails.fulfilled, (state, action) => {
                state.businessFetching = 'fulfilled';
                state.businessDetails = action.payload;
                state.businessFetchingError = null;
            })
            .addCase(fetchBusinessDetails.rejected, (state, action) => {
                state.businessFetching = 'rejected';
                state.businessFetchingError = action.error.message || 'Failed to fetch business details';
            });
    }
})

export const { addBusiness, clearBusinessDetails } = businessSlice.actions;
export default businessSlice.reducer;