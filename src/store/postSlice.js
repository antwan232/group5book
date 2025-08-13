import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../util/supabaseClient";
import toast from "react-hot-toast";

const initialState = {
	loading: false,
	error: null,
	posts: [],
	modal: { isOpen: false, id: null },
};

export const getPosts = createAsyncThunk("post/getPosts", async (_, thunkAPI) => {
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
});

export const deletePost = createAsyncThunk("post/deletePost", async (postId, thunkAPI) => {
	console.log("postId: ", postId);

	try {
		const { error } = await supabase.from("posts").delete({ count: 1 }).eq("id", postId);

		if (error) {
			throw error;
		}

		const { error: getPostsError, data: getPostsData } = await supabase.from("posts").select("*");
		toast.success("Post deleted successfully!");

		if (getPostsError) throw getPostsError;

		return getPostsData;
	} catch (error) {
		console.log(error);
		toast.error("Failed to delete post: " + error.message);
		return thunkAPI.rejectWithValue(error.message || "Delete posts failed");
	}
});

// إنشاء بوست جديد
export const createPost = createAsyncThunk("post/createPost", async (newPost, thunkAPI) => {
	try {
		const { data, error } = await supabase.from("posts").insert([newPost]).select();

		if (error) throw error;

		return data[0]; // بيرجع البوست اللي اتعمل
	} catch (error) {
		console.error(error);
		return thunkAPI.rejectWithValue(error.message || "Create post failed");
	}
});

const postSlice = createSlice({
	name: "postSlice",
	initialState,
	reducers: {
		openModal(state, { payload }) {
			state.modal = { id: payload, isOpen: true };
		},
		closeModal(state, { payload }) {
			state.modal = { id: payload, isOpen: false };
		},
	},

	extraReducers: (builder) => {
		builder
			// get posts cases
			// --------------------------------------------------
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
			// --------------------------------------------------
			// delete post cases
			// --------------------------------------------------
			.addCase(deletePost.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(deletePost.fulfilled, (state, { payload }) => {
				state.loading = false;
				state.posts = payload;
				state.error = null;
				console.log("state.posts", state.posts);
			})
			.addCase(deletePost.rejected, (state, action) => {
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
	},
});

// export const { } = postSlice.actions
export default postSlice.reducer;
export const { openModal, closeModal } = postSlice.actions;
