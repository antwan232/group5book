import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../store/postSlice";

export default function Modal({ children, post }) {
	const dispatch = useDispatch();
	const isOpen = useSelector((state) => state.posts.modal.isOpen);

	return (
		<>
			{/* modal backdrop start */}
			{isOpen && (
				<div
					onClick={() => dispatch(closeModal(post.id))}
					className={`absolute inset-0 bg-black/60 transition-opacity duration-300 z-30`}></div>
			)}
			{/* modal backdrop end */}

			{/* Edit Modal start */}
			{isOpen && (
				<>
					<div className="bg-gray-900 rounded-xl shadow-2xl p-8 w-full max-w-5xl lg:h-10/12 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 h-screen">
						<button
							className="absolute top-3 right-3 text-gray-400 hover:text-gray-200 text-2xl transition"
							onClick={() => dispatch(closeModal())}>
							<span className="material-icons">close</span>
						</button>
						{children}
					</div>
				</>
			)}
			{/* Edit Modal end */}
		</>
	);
}