import { useState } from "react";
import { supabase } from "../../util/supabaseClient";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { getPosts } from "../../store/postSlice";
import { useUser } from "@clerk/clerk-react";

function AddPost() {
  const [isOpen, setIsOpen] = useState(false);
  const [postText, setPostText] = useState("");
  const [postDescription, setPostDescription] = useState("");
  const [postImage, setPostImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);


  const dispatch = useDispatch()

  const { user } = useUser();


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setPostImage(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

 const handlePost = async () => {
  if (!postText.trim()) return;

  let imageUrl = null;

  try {
    // رفع الصورة لو موجودة
    if (postImage) {
      const { data, error } = await supabase.storage
        .from("post-images")
        .upload(`post-${Date.now()}`, postImage);

      if (error) throw error;

      const { data: publicUrlData } = supabase.storage
        .from("post-images")
        .getPublicUrl(data.path);

      imageUrl = publicUrlData.publicUrl;
    }

    // إدخال البوست في الـ DB
    const { error } = await supabase
      .from("posts")
      .insert([
        {
          title: postText,
          description: postDescription,
          images: imageUrl ? [imageUrl] : [],
          user_id : user?.id
        },
      ])
      .select("*") // علشان يرجع البوست الجديد
      .single();

    if (error) throw error;

    toast.success("✅ post created successfully !");

    // تحديث الـ state علشان يظهر فورًا من غير refresh
    dispatch(getPosts())

    // Reset form
    setPostText("");
    setPostDescription("");
    setPostImage(null);
    setImagePreview(null);
    setIsOpen(false);

  } catch (err) {
    console.error("Post error:", err.message);
    toast.error("❌ حصل خطأ أثناء رفع البوست");
  }
};

  return (
    <div className="bg-gray-800 shadow-lg rounded-xl mx-auto max-w-2xl w-full border border-gray-700 z-10 p-4 mt-5">
      {/* أعلى البوست */}
      <div className="flex items-center gap-3">
        <img src={user?.imageUrl} alt="userProfile" className="w-10 h-10 rounded-full" />
        <button
          onClick={() => setIsOpen(true)}
          className="flex-1 text-left bg-gray-700 hover:bg-gray-600 text-gray-300 px-4 py-2 rounded-full"
        >
          What's on your mind?
        </button>
      </div>

      {/* مودال كتابة البوست */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-gray-800 rounded-xl w-full max-w-lg p-5">
            <h2 className="text-lg font-semibold text-white mb-4">
              Create Post
            </h2>

            {/* عنوان البوست */}
            <textarea
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-700 text-gray-200 resize-none mb-3"
              rows="3"
              placeholder="What's on your mind?"
            />

            {/* وصف البوست */}
            <textarea
              value={postDescription}
              onChange={(e) => setPostDescription(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-700 text-gray-200 resize-none mb-3"
              rows="3"
              placeholder="Add a description..."
            />

            {/* رفع صورة */}
            <div className="mb-3">
              <label className="block text-gray-300 mb-1">
                Add Image (optional)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full text-gray-200 bg-gray-700 p-2 rounded-lg cursor-pointer"
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="mt-2 rounded-lg max-h-40 object-cover"
                />
              )}
            </div>

            {/* أزرار التحكم */}
            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-gray-600 text-gray-200 rounded-lg hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handlePost}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddPost;
