import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPost } from '../Slice/PostSlice';

function AddPost() {

  const { user } = useSelector((state) => state.auth);


  console.log(user)

  const [isOpen, setIsOpen] = useState(false);
  const [postText, setPostText] = useState("");

  const dispatch = useDispatch();

  const handlePost = () => {
    if (!postText.trim()) return; // مايبعتش بوست فاضي

    const newPost = {
      title: postText,
      user_id: "123", // هنا تحط ID اليوزر الحقيقي من Auth
      created_at: new Date(),
    };

    dispatch(createPost(newPost));
    setPostText("");
    setIsOpen(false);
  };

  return (
    <div className="bg-gray-800 shadow-lg rounded-xl mx-auto max-w-2xl w-full border border-gray-700 z-10 p-4 mt-5">
      {/* أعلى البوست */}
      <div className="flex items-center gap-3">
        <img
          src= {user?.imageUrl}
          alt="userProfile"
          className="w-10 h-10 rounded-full"
        />
        <button
          onClick={() => setIsOpen(true)}
          className="flex-1 text-left bg-gray-700 hover:bg-gray-600 text-gray-300 px-4 py-2 rounded-full"
        >
          What's on your mind?
        </button>
      </div>

      {/* خط فاصل */}
      <div className="border-t border-gray-600 my-3"></div>

      {/* أزرار أسفل البوست */}
      <div className="flex justify-between">
        <button className="flex items-center gap-2 text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-lg flex-1 justify-center">
          📷 Photo/Video
        </button>
        <button className="flex items-center gap-2 text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-lg flex-1 justify-center">
          😀 Feeling/Activity
        </button>
      </div>

      {/* مودال كتابة البوست */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-gray-800 rounded-xl w-full max-w-lg p-5">
            <h2 className="text-lg font-semibold text-white mb-4">
              Create Post
            </h2>
            <textarea
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-700 text-gray-200 resize-none"
              rows="5"
              placeholder="What's on your mind?"
            />
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
