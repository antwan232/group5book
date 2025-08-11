import toast from "react-hot-toast";
import PostHeader from "./PostHeader";
import PostContent from "./PostContent";
import { supabase } from "../../util/supabaseClient";
import PostActions from "./PostActions";

export default function PostCard({ post }) {
	// Handler for edit (from PostContent)
	const handleEdit = async (newData) => {
		await supabase
			.from("posts")
			.update({ ...newData })
			.eq("id", post.id);

		toast.success("Post updated successfully!");
	};

	if (!post)
		return (
			<h1
				style={{
					color: "white",
					fontSize: "1.5rem",
					marginTop: "20px",
					marginBottom: "20px",
					fontWeight: "bold",
					textAlign: "center",
				}}>
				There are not any posts yet!
			</h1>
		);

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
