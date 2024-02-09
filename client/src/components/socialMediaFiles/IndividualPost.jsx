import React, { useRef } from "react";
import examplePfp from "../../assets/example-pfp.png";

import commentIcon from "../../assets/comment-icon.svg";
import pencilIcon from "../../assets/pencil-icon.svg";
import LikesContainer from "./LikesContainer.jsx";
import EditModal from "./EditModal.jsx";

export default function IndividualPost({
  currentUser,
  currentUserEmail,
  postTitle,
  postDate,
  postContent,
  postLikes,
  postComments,
  showEdit,
}) {
  const dialog = useRef();

  function showModal() {
    dialog.current.showModal();
  }

  return (
    <>
      {/* each post */}
      <div className="flex flex-col gap-4 pl-4 pb-8 bg-slate-800 rounded-xl shadow-xl hover:scale-105 lg:hover:scale-100 duration-300">
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
              {postDate}
            </div>
          </div>
        </div>
        {/* post title */}
        <div className="text-xl font-semibold">{postTitle}</div>
        {/* post content */}
        <div className="text-md font-light pr-4">{postContent}</div>
        {/* likes and comments container and edit */}
        <div className="flex flex-col space-y-4">
          <div className="flex justify-between items-center">
            <LikesContainer
              postLikes={postLikes}
              postTitle={postTitle}
              postAuthorEmail={currentUserEmail}
            />
            {/* edit container */}
            {showEdit && (
              <>
                <div>
                  <img
                    src={pencilIcon}
                    className="w-8 hover:scale-105 duration-300 mb-0.5 mr-8"
                    onClick={showModal}
                  />
                </div>
                <EditModal
                  ref={dialog}
                  currentUser={currentUser}
                  currentUserEmail={currentUserEmail}
                  postTitle={postTitle}
                  postContent={postContent}
                  postLikes={postLikes}
                  postComments={postComments}
                />
              </>
            )}
          </div>

          {/* comment container */}
          {/* <div className="">
            <img
              src={commentIcon}
              alt="comment-icon"
              className="w-8 hover:scale-105 duration-300"
            />
          </div> */}
        </div>
      </div>
    </>
  );
}
