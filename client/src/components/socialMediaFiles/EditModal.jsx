import React, { forwardRef, useRef } from "react";
import closeIcon from "../../assets/close-icon.svg";
import acceptIcon from "../../assets/accept-icon.svg";
import axios from "axios";

const EditModal = forwardRef(function EditModal(
  {
    currentUser,
    currentUserEmail,
    postTitle,
    postContent,
    postLikes,
    postComments,
  },
  ref
) {
  const newPostContent = useRef();

  function editPostData() {
    console.log("editing");
    axios
      .put("/posts/edit", {
        postName: postTitle,
        postText: newPostContent.current.value,
        postAuthorEmail: currentUserEmail,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }

  return (
    <>
      <dialog
        ref={ref}
        className="bg-zinc-800 py-12 px-6 rounded-xl text-white w-3/4"
      >
        <div className="flex flex-col gap-8">
          <div className="font-bold text-xl bg-zinc-800">{postTitle}</div>
          <input
            className="font-normal text-xl bg-zinc-800 focus-visible:outline-none placeholder:text-white"
            placeholder={postContent}
            ref={newPostContent}
          ></input>
          <form method="dialog">
            <div className="flex justify-evenly w-full">
              <button className="bg-red-600 rounded-full p-2 hover:scale-105 transition">
                <img src={closeIcon} className="w-8" />
              </button>
              <button
                className="bg-green-600 rounded-full p-2 hover:scale-105 transition"
                onClick={editPostData}
              >
                <img src={acceptIcon} className="w-8" />
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
});

export default EditModal;
