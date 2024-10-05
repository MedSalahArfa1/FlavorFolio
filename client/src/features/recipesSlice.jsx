import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../Axios";

export const fetchRecipes = createAsyncThunk(`recipes/fetchRecipes`, async () => {
    const { data } = await axios.get(`/api/recipes`)
    return data
})

export const deleteRecipe = createAsyncThunk(`recipes/deleteRecipe`, async (id) => {
    await axios.delete(`/api/recipes/${id}`)
})

const initialState = {
    recipes: [],
    status: "loading",
}

const recipesSlice = createSlice({
    name: "recipes",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchRecipes.fulfilled, (state, action) => {
                state.recipes = action.payload
                state.status = "success"
            })
            .addCase(fetchRecipes.pending, (state) => {
                state.recipes = []
                state.status = "loading"
            })
            .addCase(fetchRecipes.rejected, (state) => {
                state.recipes = []
                state.status = "error"
            })

            .addCase(deleteRecipe.pending, (state, action) => {
                state.recipes = state.recipes.filter((recipe) => recipe._id !== action.meta.arg)
            })
    }
})

export default recipesSlice.reducer