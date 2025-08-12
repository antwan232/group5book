import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { supabase } from "../../supabaseClient";

const initialState = {
    loading: false,
    error: null,
    posts: []
};

// جلب البوستات
export const getPosts = createAsyncThunk(
  'post/getPosts',
  async (_, thunkAPI) => {
    try {
      const { data, error } = await supabase.from("posts").select("*").order('created_at', { ascending: false });

      if (error) throw error;

      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message || "Fetch posts failed");
    }
  }
);

// إنشاء بوست جديد
export const createPost = createAsyncThunk(
  'post/createPost',
  async (newPost, thunkAPI) => {
    try {
      const { data, error } = await supabase
        .from("posts")
        .insert([newPost])
        .select();

      if (error) throw error;

      return data[0]; // بيرجع البوست اللي اتعمل
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(error.message || "Create post failed");
    }
  }
);

const postSlice = createSlice({
  name: "postSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // getPosts
      .addCase(getPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
        state.error = null;
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // createPost
      .addCase(createPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false;
        // ضيف البوست الجديد في أول القائمة
        state.posts.unshift(action.payload);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default postSlice.reducer;
