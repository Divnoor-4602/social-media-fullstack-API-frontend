import React, { useState } from "react";
import createNewPost from "../../assets/edit-icon.svg";
import IndividualPost from "./IndividualPost";

import axios from "axios";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

export default function CreatePost({
  currentUserEmail,
  currentUser,
  posts,
  onAllPosts,
}) {
  const [postText, setPostText] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [invalidPostContent, setInvalidPostContent] = useState(false);

  function handlePostText(e) {
    setPostText(e.target.value);
  }

  function handlePostTitle(e) {
    setPostTitle(e.target.value);
  }

  function getNewPosts() {
    axios
      .get("/posts/all")
      .then((res) => {
        console.log(res.data);
        onAllPosts(res.data);
      })
      .catch((error) => console.log(error));
  }

  function createUserDocumentPosts() {
    // getting the current time
    const date = new Date();
    const currrentMonth = months[date.getMonth()];
    const currentDay = date.getDay();
    const currentYear = date.getFullYear();
    const dateToSend = currrentMonth + " " + currentDay + ", " + currentYear;

    if (postText != "" || postTitle != "") {
      axios
        .post("/posts/create", {
          email: currentUserEmail,
          postTitle: postTitle,
          postContent: postText,
          postTime: dateToSend,
        })
        .then((res) => console.log(res))
        .catch((error) => console.log(error));

      //  fetch new posts
      getNewPosts();

      // empty the input field
      setPostText("");
      setPostTitle("");
    } else {
      setInvalidPostContent(true);
    }
  }

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
        {/* post creation container */}
        <div className="flex flex-col gap-4">
          {/* post title */}
          <div>
            <input
              className={
                invalidPostContent
                  ? "w-full bg-slate-800 px-4 py-3 focus-visible:outline-none placeholder:text-sm rounded-xl border-l border-red-500"
                  : "w-full bg-slate-800 px-4 py-3 focus-visible:outline-none placeholder:text-sm rounded-xl"
              }
              placeholder="Give your ideas a heading"
              required
              onChange={handlePostTitle}
              value={postTitle}
            ></input>
          </div>
          {/* post content */}
          <div className="flex justify-between">
            <input
              placeholder="What's on your mind?"
              className={
                invalidPostContent
                  ? "placeholder:text-xs px-4 py-3 w-full focus-visible:outline-none bg-slate-800 rounded-l-xl font-light text-md border-l border-red-500"
                  : "placeholder:text-xs px-4 py-3 w-full focus-visible:outline-none bg-slate-800 rounded-l-xl font-light text-md"
              }
              value={postText}
              onChange={handlePostText}
              required
            ></input>
            <button
              className="bg-slate-700 text-md px-3 rounded-r-lg hover:bg-cyan-700 transition duration-200 group h-12"
              onClick={() => {
                createUserDocumentPosts();
              }}
            >
              <img
                src={createNewPost}
                alt="new post icon"
                className=" w-4 md:w-6 group-hover:scale-105"
              />
            </button>
          </div>
        </div>

        {/* post timeline */}
        <div className="flex flex-col space-y-8">
          <div className="text-2xl text-center font-bold mb-8">Timeline</div>
          {posts.map((post) => {
            return (
              <IndividualPost
                currentUser={currentUser}
                currentUserEmail={currentUserEmail}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
