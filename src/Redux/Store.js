import {configureStore} from "@reduxjs/toolkit"

import postSliceReducer from "../componnents/Slice/PostSlice"
import authReducer from "../componnents/Slice/authSlice"

const store = configureStore({
    reducer : {
        posts : postSliceReducer,
        auth: authReducer,
    }
})

export default store;