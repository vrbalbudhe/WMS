import React from "react";
import { useParams } from "react-router-dom";

function ProfilePage() {
  const { id } = useParams();

  return (
    <div className="w-full min-h-screen pl-5 pr-5 pt-2">
      <div className="w-full h-10 flex justify-start items-center bg-gray-800 p-5 rounded-3xl">
        <p className="text-white italic text-sm -tracking-tight font-semibold">
          / user / {id}
        </p>
      </div>
    </div>
  );
}

export default ProfilePage;
