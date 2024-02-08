import React from "react";
import exampleProfilePicture from "../../assets/example-pfp.png";

export default function ProfileBar({ currentUser, currentUserEmail }) {
  return (
    <>
      {/* card container  */}
      <div className="bg-slate-900 flex flex-col justify-center items-center rounded-xl py-12 px-8 shadow-lg">
        {/* pfp container */}
        <div className="bg-slate-700 p-3 rounded-full border-4 border-cyan-600 hover:scale-105 transition duration-300 hover:border-cyan-200 hover:bg-slate-600 hover:shadow-xl w-20">
          <img
            src={exampleProfilePicture}
            alt="example-profile-picture"
            className="w-12"
          />
        </div>
        {/* name, email and description */}
        <div className="text-2xl mt-3">{currentUser}</div>
        <div className="opacity-50 font-light text-xs mt-2">
          {currentUserEmail}
        </div>
        {/* example bio */}
        <div className="font-mono text-sm opacity-80 font-light mt-4 hidden lg:block">
          Passionate storyteller exploring worlds through words. 📚✨ | Lover of
          coffee, cats, and creativity. 🐱☕️🎨
        </div>
      </div>
    </>
  );
}
