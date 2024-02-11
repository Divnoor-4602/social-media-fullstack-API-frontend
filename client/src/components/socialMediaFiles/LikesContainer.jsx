import React, { useState, useRef } from "react";
import axios from "axios";
import likeIcon from "../../assets/like-icon.svg";
import unlikeIcon from "../../assets/unlike-icon.svg";

export default function LikesContainer({
  postLikes,
  postTitle,
  postAuthorEmail,
}) {
  const [likes, setlikes] = useState(postLikes);

  function incrementlikes() {
    setlikes((prev) => prev + 1);
  }

  function decrementLikes() {
    setlikes((prev) => prev != 0 && prev - 1);
  }

  function updateLikeCountBack(process) {
    process == "inc"
      ? axios
          .put("https://api-server-not-my-space.onrender.com/posts/likes", {
            postName: postTitle,
            likes: likes + 1,
            postAuthorEmail: postAuthorEmail,
          })
          .then((res) => console.log(res))
          .catch((err) => console.log(err))
      : axios
          .put("https://api-server-not-my-space.onrender.com/posts/likes", {
            postName: postTitle,
            likes: likes - 1,
            postAuthorEmail: postAuthorEmail,
          })
          .then((res) => console.log(res))
          .catch((err) => console.log(err));
  }

  return (
    <>
      {/* like container */}
      <div className="flex gap-2">
        {/* likes and dislikes */}
        <div className="flex gap-2 items-center">
          <img
            src={likeIcon}
            alt="like-icon"
            className="w-8 hover:scale-105 transition cursor-pointer"
            onClick={() => {
              incrementlikes();
              updateLikeCountBack("inc");
            }}
          />
          <img
            src={unlikeIcon}
            alt="like-icon"
            className="w-8 hover:scale-105 transition cursor-pointer"
            onClick={() => {
              decrementLikes();
              updateLikeCountBack("dec");
            }}
          />
          <div className="text-sm">{likes}</div>
        </div>
      </div>
    </>
  );
}
