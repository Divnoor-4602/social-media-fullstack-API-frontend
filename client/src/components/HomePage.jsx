import React, { useEffect, useState } from "react";
import ProfileBar from "./socialMediaFiles/ProfileBar";
import CreatePost from "./socialMediaFiles/CreatePost";
import NewsMainPage from "./newsFiles/NewsMainPage";

export default function HomePage({ currentUser, currentUserEmail, signOut }) {
  const [profileEditPage, setProfileEditPage] = useState(false);

  function handleProfileEditPage() {
    setProfileEditPage((prev) => !prev);
  }
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
              signOut={signOut}
              profileEditPage={handleProfileEditPage}
            />
          </div>
          {/* make a post container */}
          <div className="md:col-span-2">
            <CreatePost
              currentUserEmail={currentUserEmail}
              currentUser={currentUser}
              profileEditPage={handleProfileEditPage}
              showProfile={profileEditPage}
            />
          </div>
          {/* news live */}
          <NewsMainPage className="md:grid-cols-1" />
        </div>
      </div>
    </>
  );
}

// 276cc42f53d4445c8693ca2fcb872dd2
