import { useEffect, useState } from "react";
import { supabase } from "../util/supabaseClient";

export default function Navbar() {
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const userId = 2;
	const [friendsInfo, setFriendsInfo] = useState(null);
	const [friendsShown, setFriendsShown] = useState(false);

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const { data: friendsIds } = await supabase
					.from("users")
					.select("friends")
					.eq("id", userId);

				const { data: friendsInfo } = await supabase
					.from("users")
					.select("*")
					.in("id", friendsIds[0].friends);

				setFriendsInfo(friendsInfo);
			} catch (error) {
				console.log(error);
			}
		};
		fetchUsers();
	}, []);

	return (
		<nav
			style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}
			className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#223649] px-10 py-3">
			<div className="flex items-center gap-4 text-white">
				<div className="size-4">
					<svg
						viewBox="0 0 48 48"
						fill="none"
						xmlns="http://www.w3.org/2000/svg">
						<path
							fillRule="evenodd"
							clipRule="evenodd"
							d="M24 4H6V17.3333V30.6667H24V44H42V30.6667V17.3333H24V4Z"
							fill="currentColor"
						/>
					</svg>
				</div>

				{/* Logo  */}
				<h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] drop-shadow-[0_0_10px_#00f]">
					GROUP5BOOK
				</h2>
			</div>
			<div className="flex flex-1 justify-end gap-8">
				{/* <div className="flex gap-2">
					<button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-[#223649] text-white gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5">
						<div
							className="text-white"
							data-icon="House"
							data-size="20px"
							data-weight="regular">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="20px"
								height="20px"
								fill="currentColor"
								viewBox="0 0 256 256">
								<path d="M218.83,103.77l-80-75.48a1.14,1.14,0,0,1-.11-.11,16,16,0,0,0-21.53,0l-.11.11L37.17,103.77A16,16,0,0,0,32,115.55V208a16,16,0,0,0,16,16H96a16,16,0,0,0,16-16V160h32v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V115.55A16,16,0,0,0,218.83,103.77ZM208,208H160V160a16,16,0,0,0-16-16H112a16,16,0,0,0-16,16v48H48V115.55l.11-.1L128,40l79.9,75.43.11.1Z" />
							</svg>
						</div>
					</button>
					<button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-[#223649] text-white gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5">
						<div
							className="text-white"
							data-icon="Image"
							data-size="20px"
							data-weight="regular">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="20px"
								height="20px"
								fill="currentColor"
								viewBox="0 0 256 256">
								<path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,16V158.75l-26.07-26.06a16,16,0,0,0-22.63,0l-20,20-44-44a16,16,0,0,0-22.62,0L40,149.37V56ZM40,172l52-52,80,80H40Zm176,28H194.63l-36-36,20-20L216,181.38V200ZM144,100a12,12,0,1,1,12,12A12,12,0,0,1,144,100Z" />
							</svg>
						</div>
					</button>
					<button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-[#223649] text-white gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5">
						<div
							className="text-white"
							data-icon="Video"
							data-size="20px"
							data-weight="regular">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="20px"
								height="20px"
								fill="currentColor"
								viewBox="0 0 256 256">
								<path d="M164.44,105.34l-48-32A8,8,0,0,0,104,80v64a8,8,0,0,0,12.44,6.66l48-32a8,8,0,0,0,0-13.32ZM120,129.05V95l25.58,17ZM216,40H40A16,16,0,0,0,24,56V168a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,128H40V56H216V168Zm16,40a8,8,0,0,1-8,8H32a8,8,0,0,1,0-16H224A8,8,0,0,1,232,208Z" />
							</svg>
						</div>
					</button>
				</div> */}
				<div
					onClick={() => setDropdownOpen((prev) => !prev)}
					className="relatve bg-center bg-no-repeat hover:cursor-pointer border-3 border-purple-400 hover:border-purple-600 transition-all duration-300  aspect-square bg-cover rounded-full size-10"
					style={{
						backgroundImage:
							'url("https://lh3.googleusercontent.com/aida-public/AB6AXuA_CADS_BLYDbAa_DRDX4wTQ09yLsOA6k9Dr9N96Or4fDJgGm4IqXiDcsDaVTB6Nuxk9w9wgsk0fst72_HNgHYn-Pln8gjCW9Qj0QW1l7ZpYOnZrv1E2Fnmd21ZMLdDwcYBAFsJx0VGlWBnG_HHQ2_5R4DkAyIbhRmvyQsTlua4wgSVp871UdRdgMbseRN4WKe9TMSHrsMHLye0pwVErJ6_SJA8QYVpLzmWxI-wH672HfURH33Bg1Q2uPAqjn1nm6OlUJwfAkIHeAQ")',
					}}
				/>
				{dropdownOpen && (
					<div className="absolute right-3 mt-13 w-40 bg-gray-900 border border-gray-700 rounded-lg shadow-lg z-20 animate-fadeIn">
						<button
							className="w-full text-center px-4 py-2 hover:bg-gray-800 text-gray-100 transition"
							onClick={() => {
								setFriendsShown((prev) => !prev);
							}}>
							🤼 my friends
						</button>
						{friendsShown && (
							<div className="absolute right-0 mt-1 w-full  bg-gray-900 border border-gray-700 rounded-lg shadow-lg z-20 animate-fadeIn text-gray-400 flex flex-col justify-center items-center">
								{friendsInfo.map((friend) => (
									<div
										key={`${friend.id}-friend`}
										className="flex items-center px-4 py-2 cursor-pointer gap-2 justify-start hover:bg-gray-800 w-full">
										<img
											className={`w-6 h-6 rounded-full border-3 border-${
												friend.active ? "purple" : "gray"
											}-400 hover:border-${
												friend.active ? "purple" : "gray"
											}-600 transition-all duration-300`}
											src={friend.avatar}
											alt={`${friend.name} avatar`}
										/>
										<span className="w-full text-start">{`${friend.name}`}</span>
									</div>
								))}
							</div>
						)}
					</div>
				)}
			</div>
		</nav>
	);
}
