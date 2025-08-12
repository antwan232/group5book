import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useUser } from "@clerk/clerk-react"; 
import { toggleDarkMode } from "../../store/themeSlice";
import { setProfilePicture } from "../../store/userSlice";
import { setFeeling } from "../../store/feelingSlice";
import { toggleSidebar } from "../../store/sidebarSlice";

import one from "../../assets/1.jpg";
import two from "../../assets/2.jpg";
import three from "../../assets/3.jpg";
import four from "../../assets/4.jpg";
import five from "../../assets/5.jpg";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Map of available profile images 
const profileImages = {
  profile1: one,
  profile2: two,
  profile3: three,
  profile4: four,
  profile5: five
};

// List of feelings
const feelings = [
  "😊", "😂", "😍", "😎", "😢",
  "😡", "🙄", "😴", "🤔", "🤯"
];

export default function ProfileSidebar() {
  // Get user data from Clerk
  const { user } = useUser();

  // Get states from Redux store
  const darkMode = useSelector((state) => state.theme.darkMode);
  const isOpen = useSelector((state) => state.sidebar);
  const userFeeling = useSelector((state) => state.feeling.feeling);
  const profilePicture = useSelector((state) => state.user.profilePicture);

  const dispatch = useDispatch();


  const profileImgSrc =
    profilePicture && profileImages[profilePicture]
      ? profileImages[profilePicture]
      : user?.imageUrl || "/default-avatar.png";

  //  settings to localStorage 
  React.useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    localStorage.setItem("profilePicture", profilePicture);
    localStorage.setItem("username", user?.username || "Guest");
    localStorage.setItem("userFeeling", userFeeling);

    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode, profilePicture, user?.username, userFeeling]);

  // Reset all preferences to defaults
  const resetAll = () => {
    dispatch(toggleDarkMode(false));
    dispatch(setProfilePicture("profile1"));
    dispatch(setFeeling("😊"));
  };

  return (
    <>
      {/* Sidebar toggle button */}
      <button
        onClick={() => dispatch(toggleSidebar())}
        className={`ml-3 fixed top-1/2 z-50 -translate-y-1/2 transition-all duration-300 p-2 rounded-r-lg shadow-lg 
          ${darkMode ? "bg-white text-gray-800" : "bg-gray-800 text-white"}
          ${isOpen ? "left-64" : "left-0"}`}
      >
        {isOpen ? <ChevronLeft /> : <ChevronRight />}
      </button>

      {/* Sidebar container */}
      <div
        className={`z-40 fixed left-0 top-0 h-full w-64 flex flex-col border-r transition-transform duration-300 transform will-change-transform
          ${darkMode ? "bg-gray-800 text-white border-gray-700" : "bg-amber-50 text-gray-800 border-gray-200"}
          ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="p-4 flex flex-col items-center">
          {/* Profile Image */}
          <div className="relative mb-4">
            <img
              src={profileImgSrc}
              alt="User profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
            />
          </div>

          {/* Username */}
          <h2 className="username mb-3">{user?.username || "Guest"}</h2>

          {/* Buttons for selecting preset profile images */}
          <div className="flex space-x-2 mb-4">
            {Object.keys(profileImages).map((pic) => (
              <button
                key={pic}
                onClick={() => dispatch(setProfilePicture(pic))}
                className={`w-10 h-10 rounded-full overflow-hidden border-2 ${
                  profilePicture === pic
                    ? "border-blue-500"
                    : darkMode
                    ? "border-gray-600"
                    : "border-gray-300"
                }`}
              >
                <img
                  src={profileImages[pic]}
                  alt={`Profile ${pic}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>

          {/* Button to revert to original profile picture */}
          <button
            onClick={() => dispatch(setProfilePicture(null))}
            className={`w-full py-2 px-4 rounded-md transition-colors duration-300 ${
              darkMode
                ? "bg-gray-700 hover:bg-gray-600 text-white"
                : "bg-gray-200 hover:bg-gray-300 text-gray-800"
            }`}
          >
            Use Original Profile Picture
          </button>

          {/* Feeling Selector */}
          <div className="w-full mb-4 mt-5">
            <div
              className={`flex items-center justify-between mb-2 px-2 ${
                darkMode ? "text-gray-300" : "text-gray-500"
              }`}
            >
              <span>How are you feeling?</span>
              <span>{userFeeling}</span>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {feelings.map((feeling) => (
                <button
                  key={feeling}
                  onClick={() => dispatch(setFeeling(feeling))}
                  className={`w-full py-2 rounded-md transition-colors duration-300 flex items-center justify-center text-xl ${
                    userFeeling === feeling
                      ? "bg-blue-500 text-white"
                      : darkMode
                      ? "hover:bg-gray-700 bg-gray-800"
                      : "hover:bg-gray-100 bg-white"
                  }`}
                >
                  {feeling}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Theme and Reset Controls */}
        <div className="mt-auto p-4 border-t border-gray-200 dark:border-gray-700">
          {/* Dark mode toggle */}
          <div className="flex items-center justify-between mb-4">
            <span className="font-medium">Dark Mode</span>
            <button
              onClick={() => dispatch(toggleDarkMode())}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                darkMode ? "bg-blue-500" : "bg-gray-300"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                  darkMode ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          {/* Reset all preferences button */}
          <button
            onClick={resetAll}
            className={`w-full py-2 px-4 rounded-md transition-colors duration-300 ${
              darkMode
                ? "bg-gray-700 hover:bg-gray-600 text-white"
                : "bg-gray-200 hover:bg-gray-300 text-gray-800"
            }`}
          >
            Reset All
          </button>
        </div>
      </div>
    </>
  );
}
