import React from "react";
import ProfileBar from "./socialMediaFiles/ProfileBar";
import CreatePost from "./socialMediaFiles/CreatePost";

export default function HomePage({ currentUser, currentUserEmail }) {
  return (
    <>
      {/* Global container */}
      <div className="min-h-screen bg-slate-800 flex justify-center items-center text-white ">
        {/* home page container */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 m-8 w-full md:w-auto">
          {/* left side profile container */}
          <div>
            <ProfileBar
              currentUser={currentUser}
              currentUserEmail={currentUserEmail}
            />
          </div>
          {/* make a post container */}
          <div className="md:col-span-2">
            <CreatePost
              currentUserEmail={currentUserEmail}
              currentUser={currentUser}
            />
          </div>
        </div>
      </div>
    </>
  );
}
