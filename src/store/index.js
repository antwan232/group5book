import {configureStore} from "@reduxjs/toolkit"

import postSliceReducer from "./postSlice.js"

const store = configureStore({
    reducer : {
        posts : postSliceReducer
    }
})

export default store;