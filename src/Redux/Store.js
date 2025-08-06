import {configureStore} from "@reduxjs/toolkit"

import postSliceReducer from "../componnents/Slice/PostSlice"

const store = configureStore({
    reducer : {
        posts : postSliceReducer
    }
})

export default store;