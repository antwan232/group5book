import { useState } from "react";

export default function PostHeader({ setIsEditModalOpened, post, onDelete }) {
	// Demo: fake current user id
	const currentUserId = "demo-user-1";
	const [dropdownOpen, setDropdownOpen] = useState(false);

	// Provide a fake post if not passed
	const fakePost = {
		id: "post-1",
		created_at: "2 hours ago",
		user: {
			id: "demo-user-1",
			name: "Jane Doe",
			avatar: "https://randomuser.me/api/portraits/women/44.jpg",
		},
	};
	const displayPost = post || fakePost;

	return (
		<>
			<div className="p-4 sm:p-5 flex items-center justify-between border-b border-gray-700 relative">
				<div className="flex items-center gap-4">
					<a
						href="#"
						className="flex items-center gap-4 group">
						<img
							alt={`${displayPost.user.name} profile picture`}
							className="w-12 h-12 rounded-full border-2 border-purple-400 hover:border-purple-600 transition-all duration-300"
							src={displayPost.user.avatar}
						/>
						<div>
							<p className="font-bold text-base text-gray-50 group-hover:underline">
								{displayPost.user.name}
							</p>
							<p className="text-sm text-gray-400">{displayPost.created_at}</p>
						</div>
					</a>
				</div>
				{/* Dropdown for post owner */}
				{displayPost.user.id === currentUserId && (
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
										setIsEditModalOpened && setIsEditModalOpened(true);
										setDropdownOpen(false);
									}}>
									<span className="material-icons align-middle mr-2 text-base">edit</span>
									Edit Post
								</button>
				<button
					className="w-full text-left px-4 py-2 hover:bg-gray-800 text-red-400 transition"
					onClick={() => {
						setDropdownOpen(false);
						if (onDelete) onDelete();
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
