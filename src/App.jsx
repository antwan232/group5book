// import { Toaster } from "react-hot-toast";
// import PostCard from "./componnents/PostCard";
// import { Provider } from "react-redux";
// import store from "./store/store";

import toast, { Toaster } from "react-hot-toast";
import React from "react";
import PostCard from "./componnents/PostCard";
import { ProfileProvider } from "./componnents/SlideBar/SlideBar";
import { ProfileSidebar } from "./componnents/SlideBar/SlideBar";
function App() {
	// Move post state to App
	const [post, setPost] = React.useState({
		id: "post1",
		title: "Programming Course Dashboard",
		description:
			"Excited to unveil our latest creation: the new Programming Course Dashboard! We've poured our hearts into crafting an intuitive, powerful, and beautiful learning experience. Your coding journey is about to get a major upgrade.",
		image:
			"https://lh3.googleusercontent.com/aida-public/AB6AXuC_z3DdD94thxBhvf_MRRvRSpzbVCS2kLFxjTLxQ5Jmk1ZnArGt7RCZsB_xDmEeA_xATzfFSO0vZbRYibgBpgZmq7eMGmaARGooi63hp8CFFJ6nDf7VYvNG6oOaXS5t5Zaz-vn806ce2OtaXCPhv4Tm_BqKEmCB-FgmxANh8IiIbI7qtis5iWqxs48cUbck_aKtRmxDRRFKjHdbA-x8075NX8HSUy1NQnudrg_2ptP_ZgePVjJD30OjtcbDcsKbjNryMVC4IAibZj9p",
		tags: ["UIUX", "WebDesign", "Coding"],
		created_at: "2h",
		user: {
			id: "user1",
			name: "Amira Sukkary",
			role: "Product Designer",
			avatar:
				"https://lh3.googleusercontent.com/aida-public/AB6AXuCszF4msnjWbbr50vNIwrsnLMZ5qtFKB2Xs90-in4cf6KyiBGo6QYIXLBxDBtcDYUAGpkJqHrjLmtaaJdC4i0h9CNTaXvUa2l6rcS68wsWBAyK75MeZIxvZw7edEPphPzyiv6JzpfWyUKBTCZ6Da3WswB9kTuBVrP__qG0A_EmlfduwYCuj6By_iv1_rHGLX32OHMOjVTQEK162obntXtysAXj0o0UwVdRKgv2FE0QEx_JKEmjovWHC2qTyZdovYiFSXdfdOm-LLSXD",
		},
		likes: 1200,
		comments: 345,
		views: 8700,
	});

	const handleDelete = () => {
		setPost(null);
		toast.success("Post deleted successfully!");
	};

	return (
		<>
				<ProfileProvider 
				>
					<div>
				<ProfileSidebar />

					</div>
		<div className="bg-gray-900 flex items-center justify-center min-h-screen p-4">
				<Toaster />
				{post ? (
					<PostCard
					post={post}
					onDelete={handleDelete}
					setPost={setPost}
					/>
				) : null}
			</div>

    		</ProfileProvider>
			</>
	 );
}

export default App;
