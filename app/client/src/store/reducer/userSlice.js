import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    rightNav:false,
    currentUser: null,
    loading: false,
    error: false,
    upload:false,
    popup:false
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        popupAction:(state, action)=>{
            state.popup = !state.popup

        },
        openUploadAction:(state, action)=>{
          state.upload = !state.upload
        },
        closeNavAction:(state, action)=>{
            state.rightNav = !state.rightNav
            console.log(state.rightNav)
         },
        loginStart: (state) => {
            state.loading = true;
        },
        loginSuccess: (state, action) => {
            state.loading = false;
            state.currentUser = action.payload;
        },
        loginFailure: (state) => {
            state.loading = false;
            state.error = true;
        },
        logout: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = false;
        },
        subscription: (state, action) => {
            if (state.currentUser.subscribedUsers.includes(action.payload)) {
                state.currentUser.subscribedUsers.splice(
                    state.currentUser.subscribedUsers.findIndex(
                        (channelId) => channelId === action.payload
                    ),
                    1
                );
            } else {
                state.currentUser.subscribedUsers.push(action.payload);
            }
        }
    },
});

export const { loginStart, loginSuccess, loginFailure, logout,closeNavAction,subscription,openUploadAction,popupAction} =
    userSlice.actions;

export default userSlice.reducer;
