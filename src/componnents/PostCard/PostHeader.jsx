import { useEffect, useState } from "react";
import { supabase } from "../../util/supabaseClient";
import { useDispatch } from "react-redux";
import { deletePost, getPosts, openModal } from "../../store/postSlice";

export default function PostHeader({ post }) {
	const dispatch = useDispatch();
	const [dropdownOpen, setDropdownOpen] = useState(false);

	const [userName, setUserName] = useState("");
	const [avatar, setAvatar] = useState("");
	const [role, setRole] = useState("");
	const userId = post?.user_id;

	useEffect(() => {
		if (userId) {
			supabase
				.from("users")
				.select("name, avatar, role")
				.eq("id", userId)
				.single()
				.then(({ data }) => {
					setUserName(data?.name || "");
					setAvatar(data?.avatar || "");
					setRole(data?.role || "");
				});
		}
	}, [userId]);

	const now = new Date().getHours();
	const postCreatedAt = new Date(post.created_at);
	const postHour = postCreatedAt.getHours();
	const isDelayTime = now - postHour !== 0;
	const createdAgo = postHour < now ? `${now - postHour}h ago` : `${postHour - now}h ago`;

	return (
		<>
			<div className="p-4 sm:p-5 flex items-center justify-between border-b border-gray-700 relative">
				<div className="flex items-center gap-4">
					<a
						href="#"
						className="flex items-center gap-4 group">
						<img
							alt={`${userName} profile picture`}
							className="w-12 h-12 rounded-full border-2 border-purple-400 hover:border-purple-600 transition-all duration-300"
							src={avatar}
						/>
						<div>
							<h1 className="font-bold text-base text-gray-400 group-hover:underline">{role}</h1>
							<p className="font-bold text-base text-gray-50 group-hover:underline">{userName}</p>
							{isDelayTime && <p className="text-sm text-gray-400">{createdAgo}</p>}
						</div>
					</a>
				</div>
				{/* Dropdown for post owner */}
				{post?.user_id === userId && (
					<div className="relative">
						<button
							className="hover:text-white focus:outline-none text-gray-300"
							onClick={() => setDropdownOpen((isOpen) => !isOpen)}>
							<span className="material-icons text-2xl">more_horiz</span>
						</button>
						{dropdownOpen && (
							<div className="absolute right-0 mt-2 w-40 bg-gray-900 border border-gray-700 rounded-lg shadow-lg z-20 animate-fadeIn">
								<button
									className="w-full text-left px-4 py-2 hover:bg-gray-800 text-gray-100 transition"
									onClick={() => {
										dispatch(openModal(post.id));
										setDropdownOpen(false);
									}}>
									<span className="material-icons align-middle mr-2 text-base">edit</span>
									Edit Post
								</button>
								<button
									className="w-full text-left px-4 py-2 hover:bg-gray-800 text-red-400 transition"
									onClick={() => {
										dispatch(deletePost(userId));
										dispatch(getPosts());
										setDropdownOpen(false);
									}}>
									<span className="material-icons align-middle mr-2 text-base">delete</span>
									Delete Post
								</button>
							</div>
						)}
					</div>
				)}
			</div>
		</>
	);
}
