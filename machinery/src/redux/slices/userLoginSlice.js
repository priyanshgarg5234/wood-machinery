import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from 'axios';

export const userLoginLifeCycle = createAsyncThunk('user-login', async (userCredObj, thunkApi) => {
    //thunkApi is for handling error
    try {
        let res = await axios.post('http://localhost:4000/user-api/login-user', userCredObj)

        //save storage in local/session storage
        if (res.data.message === "login success") {
            localStorage.setItem('token', res.data.token)
        }
        else {
            return thunkApi.rejectWithValue(res.data);
        }
        return res.data; //this will be returned to the reducers, extra reducer
    }
    catch (err) {
        return thunkApi.rejectWithValue(err);
    }
})


export let loginSlice = createSlice({
    name: 'user-login',
    initialState: {
        loginStatus: false,
        currentUser: {},
        errorMessage: '',
        isPending: false
    },
    reducers: {
        clearState: (state) => {
            state.loginStatus = false;
            state.currentUser = {};
            state.errorMessage = '';
            state.isPending = false;
            localStorage.removeItem('token');
        }
    },
    extraReducers: builder => builder
        .addCase(userLoginLifeCycle.pending, (state, action) => {
            state.isPending = true;
        })
        .addCase(userLoginLifeCycle.fulfilled, (state, action) => {
            state.currentUser = action.payload.user;
            state.loginStatus = true;
            state.errorMessage = '';
            state.isPending = false;
        })
        .addCase(userLoginLifeCycle.rejected, (state, action) => {
            state.currentUser = {};
            state.loginStatus = false;
            state.errorMessage = action.payload;
            state.isPending = false;
        })
});


//export actions
export const { clearState } = loginSlice.actions;
//expot root reducer
export default loginSlice.reducer;