import { useEffect, useState } from "react";
import { supabase } from "../../util/supabaseClient";
import { useUser } from "@clerk/clerk-react";

export default function PostActions({ post }) {
	const [showComments, setShowComments] = useState(false);
	const [commentInput, setCommentInput] = useState("");

	const {user} = useUser()

	const [avatar, setAvatar] = useState("");

	const userId = post?.user_id;

	const [totalViews, setTotalviews] = useState(post?.viewed_by_users?.length || 0);
	const [totalComments, setTotalComments] = useState(
		Array.isArray(post?.comments) 
			? post.comments.map((comment) => comment.messages).length 
			: 0
		);
	const [totalLikes, setTotalLikes] = useState(post?.liked_by_users || []);

	const [comments, setComments] = useState(post?.comments || []);

	useEffect(() => {
		if (userId) {
			supabase
				.from("users")
				.select("avatar")
				.eq("id", userId)
				.single()
				.then(({ data }) => {
					setAvatar(data?.avatar || "");
				});
		}
	}, [userId]);

	// console.log("actionStates.views: ", actionStates.views);
	const [hasPostViewed, setHasPostViewed] = useState(false);

	// Show comments section and increment view if not already expanded
	const handleShowComments = async () => {
		setShowComments(!showComments);

		const prevViews = post?.viewed_by_users || [];

		if (!hasPostViewed && !prevViews.includes(userId)) {
			try {
				const { data: TotleViews } = await supabase
					.from("posts")
					.update({
						viewed_by_users: [...prevViews, userId],
					})
					.eq("id", post?.id)
					.select("viewed_by_users");

				setTotalviews(TotleViews[0]?.viewed_by_users.length);
			} catch (error) {
				console.error(error);
			}

			setHasPostViewed(true);
		}
	};

	const handleLike = async () => {
		const { data } = await supabase.from("users").select("id").eq("id", post?.user_id);
		const userId = data?.[0]?.id;

		const prevLikes = post?.liked_by_users || [];

		if (!prevLikes.includes(userId)) {
			try {
				const { data: TotleLikes } = await supabase
					.from("posts")
					.update({
						liked_by_users: [...prevLikes, userId],
					})
					.eq("id", post?.id)
					.select("liked_by_users");

				setTotalLikes(TotleLikes[0]?.liked_by_users || []);
			} catch (error) {
				console.error(error);
			}
		}
	};

	const handleSendComment = async () => {
		console.log("user_id", userId);
		console.log("post id", post.id);
		const prevComments = post?.comments || [];
		console.log("prevComments: ", prevComments);

		if (prevComments?.map((comment) => comment.user_id) !== userId && commentInput.trim()) {
			try {
				const { data: totalComments } = await supabase
					.from("posts")
					.update({
						comments: [...prevComments, { user_id: userId, messages: [commentInput] }],
					})
					.eq("id", post?.id)
					.select("comments");

				setTotalComments(totalComments[0]?.comments.map((comment) => comment.messages).length || 0);
				setComments(totalComments[0]?.comments || []);
			} catch (error) {
				console.error(error);
			}
		} else if (commentInput.trim()) {
			try {
				const existingComment = prevComments.find((comment) => comment.user_id === userId);
				console.log("existingComment messages: ", existingComment.messages);
				console.log("existingComment: ", existingComment);

				const { data: totalComments } = await supabase
					.from("posts")
					.update({
						comments: [
							...prevComments,
							{ user_id: existingComment.user_id, messages: [...existingComment.messages, commentInput] },
						],
					})
					.eq("id", post?.id)
					.select("comments");

				setTotalComments(totalComments[0]?.comments.map((comment) => comment.messages).length || 0);
				setComments(totalComments[0]?.comments || []);
			} catch (error) {
				console.error(error);
			}
		}
		setCommentInput("");
	};

	return (
		<>
			{/* actions start */}
			<div className="flex justify-around py-3 border-y border-gray-700 text-gray-400 mb-4">
				{user?.username ? <button
					className={`flex items-center space-x-2 hover:text-purple-500  transition-colors duration-300 group ${
						totalLikes.includes(userId) ? "text-purple-500" : ""
					}`}
					onClick={handleLike}>
					<span className={`material-icons${totalLikes.includes(userId) ? "" : "-outlined"} `}>
						{totalLikes.includes(userId) ? "favorite" : "favorite_border"}
					</span>
					<span className="font-medium text-sm">
						{totalLikes.length > 0 ? totalLikes.length : null}
					</span>
				</button> : <button
					className={`cursor-not-allowed  flex items-center space-x-2 hover:text-purple-500  transition-colors duration-300 group ${
						totalLikes.includes(userId) ? "text-purple-500" : ""
					}`}
					>
					<span className={`material-icons${totalLikes.includes(userId) ? "" : "-outlined"} `}>
						{totalLikes.includes(userId) ? "favorite" : "favorite_border"}
					</span>
					<span className="font-medium text-sm">
						{totalLikes.length > 0 ? totalLikes.length : null}
					</span>
				</button>}


				{user?.username ? <button
					className="flex items-center space-x-2 hover:text-purple-500 transition-colors duration-300 group"
					onClick={handleShowComments}>
					<span className="material-icons-outlined">chat_bubble_outline</span>
					<span className="font-medium text-sm">
						{/* {comments && comments.map((comment) => comment.messages).length > 0
							? comments.map((comment) => comment.messages).length
							: null} */}
						{totalComments}
					</span>
				</button> : <button
					className=" cursor-not-allowed flex items-center space-x-2 hover:text-purple-500 transition-colors duration-300 group"
					>
					<span className="material-icons-outlined">chat_bubble_outline</span>
					<span className="font-medium text-sm">
						{/* {comments && comments.map((comment) => comment.messages).length > 0
							? comments.map((comment) => comment.messages).length
							: null} */}
						{totalComments}
					</span>
				</button>}
				
				
				<div className="flex items-center space-x-2">
					<span className="material-icons-outlined">visibility</span>
					<span className="font-medium text-sm">{totalViews > 0 ? totalViews : null}</span>
				</div>
			</div>
			{/* actions end */}
			{/* Comments start */}

			{showComments && (
				<>
					<div className="mt-6 space-y-4">
						<div
							className="flex flex-col items-start gap-5"
							key={`${post?.id}-comment`}>
							{comments
								.map((comment) => comment.messages)
								.map((message,i) => (
									<div
										key={`${message}-${userId}-${i}`}
										className="flex gap-3 items-center w-full">
										<img
											alt={`User profile picture for commenting`}
											className="w-9 h-9 rounded-full"
											src={avatar}
										/>
										<div
											key={`${userId}-${message}`}
											className="flex-grow flex  bg-gray-900 rounded-lg p-3">
											<p className="text-sm text-gray-400 mt-1">{message}</p>
											<p className="font-medium  text-sm text-gray-500 ms-auto w-auto">
												user example
											</p>
										</div>
									</div>
								))}
						</div>
					</div>
					<div className="p-4 border-t border-gray-700 mt-4">
						<div className="flex items-start space-x-4">
							<img
								alt="User profile picture for commenting"
								className="w-10 h-10 rounded-full"
								src={avatar}
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
		</>
	);
}
