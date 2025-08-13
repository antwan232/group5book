import {configureStore} from "@reduxjs/toolkit"

import postSliceReducer from "./postSlice.js"
import authSliceReducer from "./authSlice.js"
import themeSliceReducer from "./themeSlice.js";
import feelingSliceReducer from "./feelingSlice.js";
import userSliceReducer from "./userSlice.js";
import sidebarSliceReducer from "./sidebarSlice.js";

const store = configureStore({
    reducer : {
        posts : postSliceReducer , 
        auth : authSliceReducer ,
        theme: themeSliceReducer ,
        feeling: feelingSliceReducer ,
        user: userSliceReducer ,
        sidebar: sidebarSliceReducer 
        
    }
})

export default store;

