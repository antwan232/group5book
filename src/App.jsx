import { useEffect } from "react";
import PostCard from "./componnents/PostCard/PostCard";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "./store/postSlice";
import { Toaster } from "react-hot-toast";

function App() {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getPosts());
	}, [dispatch]);

	const posts = useSelector((state) => state.posts.posts);
	const isLoading = useSelector((state) => state.posts.loading);
	const isError = useSelector((state) => state.posts.error);

	const isModalOpened = useSelector((state) => state.posts.modal.isOpen);
	const modalId = useSelector((state) => state.posts.modal.id);

	return (
		<div className="bg-gray-900 gap-10 flex flex-col items-center justify-center p-4">
			{isLoading && <h1>Loading...</h1>}

			{posts && (
				<>
					<Toaster />
					{posts?.map((post) => {
						if (isModalOpened && modalId === post.id) {
							return (
								<PostCard
									key={post.id}
									post={post}
								/>
							);
						} else if (!isModalOpened) {
							return (
								<PostCard
									key={post.id}
									post={post}
								/>
							);
						}
					})}
				</>
			)}

			{isError && <h1>Sorry we are not working right now!</h1>}
		</div>
	);
}

export default App;
