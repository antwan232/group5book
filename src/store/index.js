import {configureStore} from "@reduxjs/toolkit"

import postSliceReducer from "./postSlice.js"
import authSliceReducer from "./authSlice.js"

const store = configureStore({
    reducer : {
        posts : postSliceReducer , 
        auth : authSliceReducer
    }
})

export default store;