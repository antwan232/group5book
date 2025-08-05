import { useState } from "react";
// import data from "../util/data";
import Modal from "./Modal";
import toast from "react-hot-toast";
import PostHeader from "./PostHeader";

export default function PostContent() {
	// Fake post object
	const fakePost = {
		id: "post-1",
		created_at: "2 hours ago",
		title: "My Demo Post",
		description: "This is a demo post description.",
		image:
			"https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
		user: {
			id: "demo-user-1",
			name: "Jane Doe",
			avatar: "https://randomuser.me/api/portraits/women/44.jpg",
		},
	};

	const [editForm, setEditForm] = useState({
		title: fakePost.title,
		description: fakePost.description,
		image: fakePost.image,
	});

	const [isEditModalOpened, setIsEditModalOpened] = useState(false);

	return (
		<>
			{/* modal start */}
			<Modal
				isOpen={isEditModalOpened}
				onClose={setIsEditModalOpened}>
				<h2 className="text-2xl font-bold text-gray-50 mb-6">Edit Post</h2>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						// In a real app, update the post here
						setIsEditModalOpened(false);
						toast.success("Post updated successfully!");
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
					<ModalInput
						value={editForm.image}
						onChange={(val) => setEditForm((prev) => ({ ...prev, image: val }))}
						labelText="Image URL"
					/>

					<div className="flex justify-end gap-3 mt-6">
						<button
							type="button"
							className="px-4 py-2 rounded-lg bg-gray-700 text-gray-200 hover:bg-gray-600 transition"
							onClick={() => setIsEditModalOpened(false)}>
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

			{!isEditModalOpened && (
				<>
					<PostHeader
						setIsEditModalOpened={setIsEditModalOpened}
						post={fakePost}
					/>
					<PostImage
						image={editForm.image}
						title={editForm.title}
					/>
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
	return (
		<div className="p-4 sm:p-5">
			{/* Description start */}
			<h2 className="font-medium text-xl leading-tight text-gray-50 mb-2">{title}</h2>
			<p className="text-sm text-gray-400 leading-relaxed mb-4">{description}</p>
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
