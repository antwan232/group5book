import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { supabase } from "../../supabaseClient";

const initialState = {
    loading : false,
    error : null , 
    posts : []
}

export const getPosts = createAsyncThunk(
  'post/getPosts',
  async (_, thunkAPI) => {
    try {
      const { data, error } = await supabase.from("posts").select("*");
      
      if (error) {
        throw error;
      }

      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message || "Fetch posts failed");
    }
  }
);



const postSlice = createSlice ({
    name : "postSlice" ,
    initialState ,
    reducers : {} ,

    extraReducers : (builder) => {
        builder
            .addCase(getPosts.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getPosts.fulfilled, (state, action) => {
                state.loading = false
                state.posts = action.payload
                state.error = null
            })
            .addCase(getPosts.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    }
})

// export const { } = postSlice.actions
export default postSlice.reducer;