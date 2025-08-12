import { useEffect, useState } from "react";
import { supabase } from "../util/supabaseClient";
import { useClerk, useUser } from "@clerk/clerk-react";

export default function Navbar() {
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [friendsInfo, setFriendsInfo] = useState([]);
	const [friendsShown, setFriendsShown] = useState(false);

	const { signOut, redirectToSignIn } = useClerk();
	const { user } = useUser();

	const userId = 2; // مؤقتاً

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const { data: friendsIds } = await supabase
					.from("users")
					.select("friends")
					.eq("id", userId);

				if (!friendsIds?.length) return;

				const { data: friendsData } = await supabase
					.from("users")
					.select("*")
					.in("id", friendsIds[0].friends);

				setFriendsInfo(friendsData || []);
			} catch (error) {
				console.log(error);
			}
		};
		fetchUsers();
	}, []);

	return (
		<nav className="bg-[#0f172a] border-b border-gray-700 px-6 py-3 flex items-center justify-between">
			{/* Logo */}
			<div className="flex items-center gap-3 text-white">
				<svg viewBox="0 0 48 48" className="w-6 h-6" fill="currentColor">
					<path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M24 4H6V17.3333V30.6667H24V44H42V30.6667V17.3333H24V4Z"
					/>
				</svg>
				<h2 className="text-lg font-bold drop-shadow-[0_0_10px_#00f]">
					GROUP5BOOK
				</h2>
			</div>

			{/* Right Section */}
			<div className="flex items-center gap-5 relative">
				{!user?.id && (
					<button
						onClick={() => redirectToSignIn()}
						className="px-4 py-1.5 rounded-md bg-purple-600 hover:bg-purple-700 transition text-white"
					>
						Sign in
					</button>
				)}

				{/* Avatar */}
				<div
					onClick={() => setDropdownOpen((prev) => !prev)}
					className="bg-center bg-no-repeat border-2 border-purple-500 hover:border-purple-700 aspect-square bg-cover rounded-full w-10 h-10 cursor-pointer transition-all"
					style={{
						backgroundImage: `url(${user?.imageUrl || "/default-avatar.png"})`,
					}}
				/>

				{/* Username */}
				<p className="text-gray-200 font-medium hidden sm:block">
					{user?.username || "Guest"}
				</p>

				{/* Dropdown */}
				{dropdownOpen && (
					<div className="absolute top-14 right-0 w-48 bg-gray-900 border border-gray-700 rounded-lg shadow-lg z-20">
						<button
							className="w-full text-left px-4 py-2 hover:bg-gray-800 text-gray-100"
							onClick={() => setFriendsShown((prev) => !prev)}
						>
							🤼 My friends
						</button>

						{/* Friends List */}
						{friendsShown && (
							<div className="max-h-56 overflow-y-auto">
								{friendsInfo.length > 0 ? (
									friendsInfo.map((friend) => (
										<div
											key={friend.id}
											className="flex items-center px-4 py-2 gap-2 hover:bg-gray-800 cursor-pointer"
										>
											<img
												className={`w-6 h-6 rounded-full border-2 ${
													friend.active
														? "border-purple-500"
														: "border-gray-400"
												}`}
												src={friend.avatar}
												alt={`${friend.name} avatar`}
											/>
											<span className="text-gray-300">{friend.name}</span>
										</div>
									))
								) : (
									<p className="text-center text-gray-400 py-2 text-sm">
										No friends yet
									</p>
								)}
							</div>
						)}

						<hr className="border-gray-700" />
						<button
							onClick={() => signOut()}
							className="w-full text-left px-4 py-2 hover:bg-gray-800 text-gray-100"
						>
							Log out
						</button>
					</div>
				)}
			</div>
		</nav>
	);
}
