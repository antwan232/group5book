import React, { useState, createContext, useContext } from 'react';
import { useEffect } from 'react';
import one from "../../assets/1.jpg";
import two from "../../assets/2.jpg";
import three from "../../assets/3.jpg";
import four from "../../assets/4.jpg";
import five from "../../assets/5.jpg"
import { ChevronLeft, ChevronRight } from 'lucide-react';


const ProfileContext = createContext();

const ProfileProvider = ({ children }) => {
// const for dark mode
    const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved === 'true' ? true : false;
    });
// const for profile pic 
const [currentProfilePic, setCurrentProfilePic] = useState(() => {
    return localStorage.getItem('profilePic') || 'profile1';
    });
// const for name
const [username, setUsername] = useState(() => {
  return localStorage.getItem('username') || '';
});
// const for feeling
const [userFeeling, setUserFeeling] = useState(() => {
  return localStorage.getItem('userFeeling') || '😊';
});

const [isOpen, setIsOpen] = useState(false);


    useEffect(() => {
        localStorage.setItem('darkMode', darkMode);
        localStorage.setItem('profilePic', currentProfilePic);
        localStorage.setItem('username', username);
        localStorage.setItem('userFeeling', userFeeling);
    // dark mode if condition
    if (darkMode) {
        document.body.classList.add('dark');
    } else {
        document.body.classList.remove('dark');
    }
    }, [darkMode, currentProfilePic, username, userFeeling]);
    //const for rest all
    const resetAll = () => {
        setDarkMode(false);
        setCurrentProfilePic('profile1');
        setUsername('');
        setUserFeeling('😊');
      };
      
return (
    <ProfileContext.Provider 
        value={{
            darkMode,
            setDarkMode,
            currentProfilePic,
            setCurrentProfilePic,
            username,
            setUsername,
            userFeeling,
            setUserFeeling,
            resetAll,
            isOpen,
    setIsOpen
        }}
    >
    {children}
    </ProfileContext.Provider>
);
};

const useProfile = () => {
    return useContext(ProfileContext);
};
// profile pic choose
const profileImages = {
    profile1: one,
    profile2: two,
    profile3: three,
    profile4: four,
    profile5: five
};
// feeling choose 
const feelings = [
    '😊', '😂', '😍', '😎', '😢',
    '😡', '🙄', '😴', '🤔', '🤯'
];

const ProfileSidebar = () => {
    const {
        darkMode,
        setDarkMode,
        currentProfilePic,
        setCurrentProfilePic,
        userFeeling,
        setUserFeeling,
        resetAll,
  isOpen,
  setIsOpen,
    } = useProfile();
  

return (
  <>
   <button
  onClick={() => setIsOpen(!isOpen)}
  className={`ml-3 fixed top-1/2 z-50 -translate-y-1/2 transition-all duration-300 bg-white-800 text-white p-2 rounded-r-lg shadow-lg ${
    isOpen ? 'left-64' : 'left-0'
  }`}
>
  {isOpen ? <ChevronLeft /> : <ChevronRight />}
</button>
    <div
  className={` z-40 fixed  left-0 top-0 h-full w-64 flex flex-col border-r transition-transform duration-300 transform will-change-transform
    ${darkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-800 border-gray-200'}
    ${isOpen ? 'translate-x-0' : '-translate-x-full'}
  `}
>


    {/* Profile Section */}
        <div className="p-4 flex flex-col items-center">
        <div className="relative mb-4">
            <img 
                src={profileImages[currentProfilePic]} 
                alt={`User profile ${currentProfilePic}`}
                className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
            />
        </div>
            <h2 className='username mb-3 '>nour</h2>
            <div className="flex space-x-2 mb-4">
                {Object.keys(profileImages).map((pic) => (
                    <button
                    key={pic}
                    onClick={() => setCurrentProfilePic(pic)}
                    className={`w-10 h-10 rounded-full overflow-hidden border-2 ${
                        currentProfilePic === pic 
                        ? 'border-blue-500' 
                        : darkMode 
                            ? 'border-gray-600' 
                            : 'border-gray-300'
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
                
        <div className="w-full mb-4 mt-5">
            <div className={`flex items-center justify-between mb-2 px-2 ${
            darkMode ? 'text-gray-300' : 'text-gray-500'
            }`}>
            <span>How are you feeling?</span>
            <span>{userFeeling}</span>
        </div>
        <div className="grid grid-cols-5 gap-2">
            {feelings.map((feeling) => (
            <button
                key={feeling}
                onClick={() => setUserFeeling(feeling)}
                className={`w-full py-2 rounded-md transition-colors duration-300 flex items-center justify-center text-xl ${
                    userFeeling === feeling
                        ? 'bg-blue-500 text-white'
                        : darkMode
                        ? 'hover:bg-gray-700 bg-gray-800'
                        : 'hover:bg-gray-100 bg-white'
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
        <div className="flex items-center justify-between mb-4">
            <span className="font-medium">Dark Mode</span>
            <button
            onClick={() => setDarkMode(!darkMode)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
            darkMode ? 'bg-blue-500' : 'bg-gray-300'
            }`}
            >
            <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                darkMode ? 'translate-x-6' : 'translate-x-1'
                }`}
            />
        </button>
    </div>
        
        <button
            onClick={resetAll}
            className={`w-full py-2 px-4 rounded-md transition-colors duration-300 ${
                darkMode
                ? 'bg-gray-700 hover:bg-gray-600 text-white'
                : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
          }`}
        >
            Reset All 
        </button>
      </div>
     
    </div>
    </>
  );
};

export { ProfileSidebar, ProfileProvider, useProfile };


