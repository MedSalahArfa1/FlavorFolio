import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../Axios'

export const register = createAsyncThunk(
    `auth/register`,
    async (params, { dispatch, rejectWithValue }) => {
        try {
            const { data } = await axios.post(`api/user/register`, params)

            if ("token" in data) {
                window.localStorage.setItem("token", data.token)
                dispatch(account())
            }

            return data
        } catch (error) {
            if(error.response.status === 400){
                if(error.response.data.message){
                   return rejectWithValue(error.response.data.message) 
                }
                return rejectWithValue(error.response.data)
            }
            return rejectWithValue("Oops! Something went wrong!")
        }
    }
)

export const login = createAsyncThunk(
    `auth/login`,
    async (params, { dispatch, rejectWithValue }) => {
        try {
            const { data } = await axios.post(`api/user/login`, params)

            if ("token" in data) {
                window.localStorage.setItem("token", data.token)
                dispatch(account())
            }

            return data
        } catch (error) {
            if(error.response.status === 400 || error.response.status ===404){
                if(error.response.data.message){
                   return rejectWithValue(error.response.data.message) 
                }
                return rejectWithValue(error.response.data)
            }
            return rejectWithValue("Oops! Something went wrong!") 
        }
    }
)

export const account = createAsyncThunk(
    `auth/account`,
    async () => {
        const { data } = await axios.get(`api/user/account`)
        return data
    }
)

const initialState = {
    data: null,
    status: 'loading'
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        logout: (state) => {
            state.data = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.data = null
                state.status = 'loading'
            })
            .addCase(register.fulfilled, (state, action) => {
                state.data = action.payload
                state.status = 'success'
            })
            .addCase(register.rejected, (state, action) => {
                state.error = action.payload
                state.status = 'error'
            })

            .addCase(login.pending, (state) => {
                state.data = null
                state.status = 'loading'
            })
            .addCase(login.fulfilled, (state, action) => {
                state.data = action.payload
                state.status = 'success'
            })
            .addCase(login.rejected, (state, action) => {
                state.error = action.payload
                state.status = 'error'
            })

            .addCase(account.pending, (state) => {
                state.data = null
                state.status = 'loading'
            })
            .addCase(account.fulfilled, (state, action) => {
                state.data = action.payload
                state.status = 'success'
            })
            .addCase(account.rejected, (state, action) => {
                state.data = action.payload
                state.status = 'error'
            })
    }
})


export const { logout } = authSlice.actions // Export it differently because it's a synchronous action
export default authSlice.reducer