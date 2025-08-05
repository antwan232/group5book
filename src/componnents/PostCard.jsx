import { useState } from "react";
import toast from "react-hot-toast";
import PostHeader from "./PostHeader";
import PostContent from "./PostContent";

export default function PostCard({ post, onDelete, setPost, onEdit }) {
	const [showComments, setShowComments] = useState(false);
	const [commentInput, setCommentInput] = useState("");
	const [comments, setComments] = useState([]);
	const [stats, setStats] = useState({
		likes: post.likes,
		comments: post.comments,
		views: post.views,
	});
	const [hasPostViewed, setHasPostViewed] = useState(false);

	// Always has post, so no need for null check

	// Show comments section and increment view if not already expanded
	const handleShowComments = () => {
		setShowComments((prev) => !prev);
		if (!hasPostViewed) {
			setStats((prev) => ({
				...prev,
				views: typeof prev.views === "number" ? prev.views + 1 : Number(prev.views) + 1,
			}));
			setHasPostViewed(true);
		}
	};

	const handleLike = () => {
		setStats((prev) => ({
			...prev,
			likes: typeof prev.likes === "number" ? prev.likes + 1 : Number(prev.likes) + 1,
		}));
	};

	const handleSendComment = () => {
		if (commentInput.trim()) {
			setComments([
				...comments,
				{
					user: post.user,
					text: commentInput,
				},
			]);
			setStats((prev) => ({
				...prev,
				comments: typeof prev.comments === "number" ? prev.comments + 1 : Number(prev.comments) + 1,
			}));
			setCommentInput("");
		}
	};

	// Handler for edit (from PostContent)
	const handleEdit = (newData) => {
		if (setPost) setPost((prev) => ({ ...prev, ...newData }));
		if (onEdit) onEdit(newData);
		toast.success("Post updated successfully!");
	};

	// Handler for delete (from PostContent)
	const handleDelete = () => {
		if (onDelete) onDelete();
	};

	if (!post) return null;
	return (
		<div className="bg-gray-800 shadow-lg rounded-xl overflow-hidden mx-auto max-w-2xl w-full border border-gray-700 z-10">
			<PostContent
				post={post}
				onEdit={handleEdit}
				onDelete={handleDelete}
			/>
			<div className="p-5">
				{/* actions start */}
				<div className="flex justify-around py-3 border-y border-gray-700 text-gray-400 mb-4">
					<button
						className="flex items-center space-x-2 hover:text-purple-500 transition-colors duration-300 group"
						onClick={handleLike}>
						<span className="material-icons-outlined">favorite_border</span>
						<span className="font-medium text-sm">{stats.likes}</span>
					</button>
					<button
						className="flex items-center space-x-2 hover:text-purple-500 transition-colors duration-300 group"
						onClick={handleShowComments}>
						<span className="material-icons-outlined">chat_bubble_outline</span>
						<span className="font-medium text-sm">{stats.comments}</span>
					</button>
					<div className="flex items-center space-x-2">
						<span className="material-icons-outlined">visibility</span>
						<span className="font-medium text-sm">{stats.views}</span>
					</div>
				</div>
				{/* actions end */}
				{/* Comments start */}

				{showComments && (
					<>
						<div className="mt-6 space-y-4">
							{comments.map((comment, idx) => (
								<div
									className="flex items-start space-x-3"
									key={idx}>
									<img
										alt={`User profile picture for commenting`}
										className="w-9 h-9 rounded-full"
										src={comment.user.avatar}
									/>
									<div className="flex-grow bg-gray-900 rounded-lg p-3">
										<p className="font-medium text-sm text-gray-50">{comment.user.name}</p>
										<p className="text-sm text-gray-400 mt-1">{comment.text}</p>
									</div>
								</div>
							))}
						</div>
						<div className="p-4 border-t border-gray-700 mt-4">
							<div className="flex items-start space-x-4">
								<img
									alt="User profile picture for commenting"
									className="w-10 h-10 rounded-full"
									src={post.user.avatar}
								/>
								<div className="flex-grow relative">
									<input
										className="w-full bg-gray-900 border border-transparent rounded-full py-2.5 pl-5 pr-12 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 text-gray-400"
										placeholder="Add a comment..."
										type="text"
										value={commentInput}
										onChange={(e) => setCommentInput(e.target.value)}
										onKeyDown={(e) => {
											if (e.key === "Enter") handleSendComment();
										}}
									/>
									<button
										className="absolute right-0 top-1/2 -translate-y-1/2 bg-purple-500 text-white rounded-xl rounded-r-full p-1.5 me-0 hover:bg-purple-600 transition-all duration-200"
										onClick={handleSendComment}>
										<span className="material-icons-outlined text-base">send</span>
									</button>
								</div>
							</div>
						</div>
					</>
				)}
			</div>
		</div>
	);
}
