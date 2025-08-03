import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
interface Product {
    id: number
    name: string
    price: number
    category: string
    description: string
    stock: number
}
interface BusinessProducts {
    businessId: number
    products: Product[]
    error: string | null
}
interface ProductState {
    // Key is businessId
    businesses: Record<number, BusinessProducts>
}

//Initail State
const initialState: ProductState = {
    businesses: {}
}

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        // Set products for a specific business
        setBusinessProducts: (state, action: PayloadAction<{ businessId: number, products: Product[] }>) => {
            const { businessId, products } = action.payload;

            //if there no businee id in redux
            if (!state.businesses[businessId]) {
                state.businesses[businessId] = {
                    businessId,
                    products: [],
                    error: null
                }
            }

            state.businesses[businessId].products = products;
            state.businesses[businessId].error = null;

        },

        // Add a single product to a business
        addProductTOBusiness: (state, action: PayloadAction<{ businessId: number, product: Product }>) => {
            const { businessId, product } = action.payload;

            if (!state.businesses[businessId]) {
                state.businesses[businessId] = {
                    businessId,
                    products: [],
                    error: null
                }
            }
            state.businesses[businessId].products.push(product);
        },

        // Update a product in a business
        updateProductInBusiness: (state, action: PayloadAction<{ businessId: number, productId: number, updatedProduct: Partial<Product> }>) => {
            const { businessId, productId, updatedProduct } = action.payload;
            if (state.businesses[businessId]) {
                const productIndex = state.businesses[businessId].products.findIndex(product => product.id === productId);
                if (productIndex !== -1) {
                    state.businesses[businessId].products[productIndex] = {
                        ...state.businesses[businessId].products[productIndex],
                        ...updatedProduct
                    }
                }
            }
        },
        // Remove a product from a business
        removeProductFromBusiness: (state, action: PayloadAction<{ businessId: number, productId: number }>) => {
            const { businessId, productId } = action.payload;
            
            if (state.businesses[businessId]) {
                state.businesses[businessId].products = state.businesses[businessId].products.filter(p => p.id !== productId);
            }
        },
    }
})
    
export const {
    setBusinessProducts,
    addProductTOBusiness,
    updateProductInBusiness,
    removeProductFromBusiness,
}=productsSlice.actions;

export const selectBusinessProducts = (state:{products:ProductState},businessId:number)=>
    state.products.businesses[businessId]?.products||[];

export const selectBusinessProductsError = (state: { products: ProductState }, businessId: number) => 
    state.products.businesses[businessId]?.error || null;

export default productsSlice.reducer;