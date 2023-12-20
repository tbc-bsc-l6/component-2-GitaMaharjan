import {createSlice, nanoid} from "@reduxjs/toolkit";

const initialState = {
    signin: [{
        name: "",
        email: "",
        token: "",
        type: ""
    }, {
        name: "",
        email: "",
        token: "",
        type: ""
    }]
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginUser: (state, action)=> {
            const loginUser = action.payload;
            if(action.payload.type==="customer")
                state.signin[0] = loginUser;
            else if(action.payload.type === 'admin')
                state.signin[1] = loginUser;
        },
        logoutUser: (state, action)=>{
            const logoutUser = {
                fullname: "",
                email: "",
                token: "",
                image: "",
                type: "",
            }
            state.signin[0] = logoutUser;
        },
        logoutUserAdmin: (state, action)=>{
            const logoutUser = {
                fullname: "",
                email: "",
                token: "",
                image: "",
                type: "",
            }
            state.signin[1] = logoutUser;
        }
    }
});

export const {loginUser, logoutUser, logoutUserAdmin} = authSlice.actions;

