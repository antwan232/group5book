import toast from "react-hot-toast";
import PostContent from "./PostContent";
import { supabase } from "../../util/supabaseClient";
import PostActions from "./PostActions";

export default function PostCard({ post }) {
	const handleEdit = async (newData) => {
		await supabase
			.from("posts")
			.update({ ...newData })
			.eq("id", post.id);

		toast.success("Post updated successfully!");
	};

	return (
		<div className="bg-gray-800 shadow-lg rounded-xl overflow-hidden mx-auto max-w-2xl w-full border border-gray-700 z-10">
			<PostContent
				post={post}
				onEdit={handleEdit}
			/>
			<div className="p-5">
				<PostActions post={post} />
			</div>
		</div>
	);
}
