import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom"; // ❌ شيل BrowserRouter من هنا
import { getPosts } from "./store/postSlice";
import { Toaster } from "react-hot-toast";
import Footer from "./componnents/Footer/Footer";
import { ProfileProvider, ProfileSidebar } from "./componnents/SlideBar/SlideBar";
import Navbar from "./componnents/Navbar";
import AddPost from "./componnents/AddPost/AddPost";
import PostCard from "./componnents/PostCard/PostCard";

import ClerkAuthListener from "./store/ClerkAuthListener";
import LoginPage from "./Auth/LoginPage";
import RegisterPage from "./Auth/RegisterPage";
import { useUser } from "@clerk/clerk-react";
import { supabase } from "./util/supabaseClient";

function Home() {
	const posts = useSelector((state) => state.posts.posts);
	const isLoading = useSelector((state) => state.posts.loading);
	const isError = useSelector((state) => state.posts.error);
	// const isModalOpened = useSelector((state) => state.posts.modal.isOpen);
	// const modalId = useSelector((state) => state.posts.modal.id);

	return (
		<div className="bg-gray-900 gap-10 flex flex-col items-center justify-center p-4">
			{isLoading && <h1>Loading...</h1>}

			{posts.length > 1 && (
				<>
					<Toaster />
					{posts?.map((post) => (
						<PostCard
							key={post.id}
							post={post}
						/>
					))}
				</>
			)}
			{isError && <h1>Sorry we are not working right now!</h1>}
		</div>
	);
}

function App() {
	const dispatch = useDispatch();
	const { user } = useUser();

	useEffect(() => {
    dispatch(getPosts());
	}, [dispatch]);

	// const isModalOpened = useSelector((state) => state.posts.modal.isOpen);

	return (
		<>
			<ClerkAuthListener />
			<ProfileProvider>
				<ProfileSidebar />
			</ProfileProvider>
			<Navbar />
			{user?.id && <AddPost />}

			<Routes>
				<Route
					path="/"
					element={<Home />}
				/>
				<Route
					path="/login"
					element={<LoginPage />}
				/>
				<Route
					path="/register"
					element={<RegisterPage />}
				/>
			</Routes>

			<Footer />
		</>
	);
}

export default App;

