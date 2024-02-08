import React, { useState } from "react";
import createNewPost from "../../assets/edit-icon.svg";
import examplePfp from "../../assets/example-pfp.png";

export default function CreatePost({ currentUserEmail, currentUser }) {
  const [postText, setPostText] = useState("");

  function handlePostText(e) {
    setPostText(e.target.value);
  }

  function createUserDocumentPosts() {}

  return (
    <>
      {/* post container */}
      <div className="bg-slate-900 p-6 rounded-xl space-y-8 shadow-lg">
        {/* link container */}
        <div className="flex flex-col md:flex-row justify-evenly gap-4 border-b pb-12 border-slate-700">
          <div className="text-cyan-300 font-semibold  bg-slate-700 transition duration-200 px-2 rounded-md py-1">
            Home
          </div>
          <div className="hover:text-cyan-300 font-semibold  hover:bg-slate-700 transition duration-200 px-2 py-1 rounded-md">
            Explore
          </div>
          <div className="hover:text-cyan-300 font-semibold  hover:bg-slate-700 transition duration-200 px-2  py-1 rounded-md">
            Notifications
          </div>
          <div className="hover:text-cyan-300 font-semibold  hover:bg-slate-700 transition duration-200 px-2 rounded-md py-1">
            Profile
          </div>
        </div>
        {/* create post input */}
        <div className="flex justify-between">
          <input
            placeholder="What's on your mind?"
            className="placeholder:text-xs px-4 py-3 w-full focus-visible:outline-none bg-slate-800 rounded-l-xl font-light text-md"
            value={postText}
            onChange={handlePostText}
          ></input>
          <button className="bg-slate-700 text-md px-3 rounded-r-lg hover:bg-cyan-700 transition duration-200 group h-12">
            <img
              src={createNewPost}
              alt="new post icon"
              className=" w-4 md:w-6 group-hover:scale-105"
            />
          </button>
        </div>
        {/* post timeline */}
        <div>
          <div className="text-2xl text-center font-bold mb-8">Timeline</div>
          {/* each post */}
          <div className="flex flex-col gap-4 pl-4 pb-8 bg-slate-800 rounded-xl shadow-xl hover:scale-105 duration-300">
            <div className="mt-8 flex items-center justify-between">
              <div className="flex items-center">
                {/* pfp */}
                <div className="p-2 border rounded-full border-cyan-400 mr-4 hidden sm:block">
                  <img src={examplePfp} alt="example-pfp" className="w-8" />
                </div>
                {/* name */}
                <div className="font-semibold text-sm">{currentUser}</div>
                {/* email */}
                <div className="opacity-50 text-xs mt-0.5 ml-2">
                  @{currentUserEmail}
                </div>
              </div>
              <div>
                {/* post time */}
                <div className="text-xs opacity-50 font-light hidden lg:block mr-4">
                  January 23, 2024
                </div>
              </div>
            </div>
            {/* post content */}
            <div className="text-md font-light pr-4">
              🎉 Exciting news! Just launched my new website 🚀 Check it out for
              all things related to #technology, #innovation, and #creativity!
              💻 Let's connect and explore together! 🌟 #WebsiteLaunch
              #TechEnthusiast #StayCurious
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
