import { useState } from "react";
// import data from "../util/data";
import Modal from "../UI/Modal";
import PostHeader from "./PostHeader";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../store/postSlice";

export default function PostContent({ post, onEdit }) {
	const [editForm, setEditForm] = useState({
		title: post.title,
		description: post.description,
		images: post.images,
	});
	const dispatch = useDispatch();
	const isEditModalOpened = useSelector((state) => state.posts.modal.isOpen);

	return (
		<>
			{isEditModalOpened && (
				<>
					{/* modal start */}
					<Modal
						isOpen={isEditModalOpened}
						post={post}>
						<h2 className="text-2xl font-bold text-gray-50 mb-6">Edit Post</h2>
						<form
							onSubmit={(e) => {
								e.preventDefault();

								onEdit({
									title: editForm.title,
									description: editForm.description,
									images: editForm.images,
								});
								dispatch(closeModal(post.id));
							}}
							className="space-y-5">
							<ModalInput
								value={editForm.title}
								onChange={(val) => setEditForm((prev) => ({ ...prev, title: val }))}
								labelText="Title"
							/>
							<ModalInput
								value={editForm.description}
								onChange={(val) => setEditForm((prev) => ({ ...prev, description: val }))}
								labelText="Description"
							/>

							{editForm.images &&
								editForm.images.length > 0 &&
								editForm.images.map((_, i) => (
									<ModalInput
										value={editForm.images[i]}
										key={`${post.id}modal-IMG`}
										onChange={(val) => setEditForm((prev) => ({ ...prev, images: [val] }))}
										labelText="Image URL"
									/>
								))}

							<div className="flex justify-end gap-3 mt-6">
								<button
									type="button"
									className="px-4 py-2 rounded-lg bg-gray-700 text-gray-200 hover:bg-gray-600 transition"
									onClick={() => dispatch(closeModal(post.id))}>
									Cancel
								</button>
								<button
									type="submit"
									className="px-5 py-2 rounded-lg bg-purple-600 text-white font-semibold hover:bg-purple-700 transition shadow-lg">
									Save Changes
								</button>
							</div>
						</form>
					</Modal>
					{/* modal end */}
				</>
			)}

			{!isEditModalOpened && (
				<>
					<PostHeader post={post} />
					{editForm.images &&
						editForm.images.length > 0 &&
						editForm.images.map((_, i) => (
							<PostImage
								image={editForm.images[i]}
								title={editForm.title}
								key={`${post.id}post-IMG${i}`}
							/>
						))}

					<Description
						title={editForm.title}
						description={editForm.description}
					/>
				</>
			)}
		</>
	);
}

function Description({ title, description }) {
	const [isShown, setIsShown] = useState(false);
	const formattedDescription = description?.split(" ").slice(0, 30).join(" ");

	return (
		<div className="p-4 sm:p-5">
			{/* Description start */}
			<h2 className="font-medium text-xl leading-tight text-gray-50 mb-2">{title}</h2>
			<p className="text-sm text-gray-400 leading-relaxed mb-4">
				{isShown ? (
					<>
						{description}
						<button
							className="text-lg ms-1 hover:underline  hover:text-gray-50 transition-all duration-200 text-gray-500"
							onClick={() => setIsShown(false)}>
							show less
						</button>
					</>
				) : (
					<>
						{formattedDescription}
						{description?.length > 15 && (
							<>
								...
								<button
									className="text-lg ms-1 hover:underline  hover:text-gray-50 transition-all duration-200 text-gray-500"
									onClick={() => setIsShown(true)}>
									show more
								</button>
							</>
						)}
					</>
				)}
			</p>
			{/* Description end */}
		</div>
	);
}

function PostImage({ image, title }) {
	return (
		<>
			{/* Image start */}
			<div className="relative h-64 sm:h-80 w-full overflow-hidden">
				<img
					alt={title}
					className="absolute inset-0 w-full h-full object-cover"
					src={image}
				/>
				<div className="absolute inset-0 bg-black/20"></div>
			</div>
			{/* Image end */}
		</>
	);
}

function ModalInput({ value, onChange, labelText }) {
	return (
		<div>
			<label className="block text-gray-300 mb-1">{labelText}</label>
			<input
				className="w-full rounded-lg bg-gray-800 border border-gray-700 px-4 py-2 text-gray-100 focus:ring-2 focus:ring-purple-500 transition"
				value={value}
				onChange={(e) => onChange(e.target.value)}
				required
			/>
		</div>
	);
}
