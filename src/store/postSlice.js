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

export const deletePost = createAsyncThunk("post/deletePost", async (userId, thunkAPI) => {
	console.log("userId: ", userId);

	try {
		const { error } = await supabase
			.from("posts")
			.delete({ count: 1 })
			.eq("user_id", userId)
		if (error) {
			throw error;
		}

		toast.success("Post deleted successfully!");
	} catch (error) {
		console.log(error);
		toast.error("Failed to delete post: " + error.message);
		return thunkAPI.rejectWithValue(error.message || "Delete posts failed");
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
			.addCase(deletePost.fulfilled, (state) => {
				state.loading = false;
				state.error = null;
			})
			.addCase(deletePost.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			});
		// --------------------------------------------------
	},
});

// export const { } = postSlice.actions
export default postSlice.reducer;
export const { openModal, closeModal } = postSlice.actions;
