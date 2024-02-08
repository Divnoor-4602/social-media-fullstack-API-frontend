import React from "react";
import examplePfp from "../../assets/example-pfp.png";
import likeIcon from "../../assets/like-icon.svg";
import commentIcon from "../../assets/comment-icon.svg";

export default function IndividualPost({
  currentUser,
  currentUserEmail,
  postTitle,
  postDate,
  postContent,
  postLikes,
  postComments,
}) {
  return (
    <>
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
          🎉 Exciting news! Just launched my new website 🚀 Check it out for all
          things related to #technology, #innovation, and #creativity! 💻 Let's
          connect and explore together! 🌟 #WebsiteLaunch #TechEnthusiast
          #StayCurious
        </div>
        {/* likes and comments container */}
        <div className="flex flex-col space-y-4">
          {/* like container */}
          <div className="flex gap-2 items-center">
            <img
              src={likeIcon}
              alt="like-icon"
              className="w-8 hover:scale-105 transition "
            />
            <div className="text-sm">233</div>
          </div>
          {/* comment container */}
          <div className="">
            <img
              src={commentIcon}
              alt="comment-icon"
              className="w-8 hover:scale-105"
            />
          </div>
        </div>
      </div>
    </>
  );
}
