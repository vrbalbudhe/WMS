import React from "react";

function HeadingSection({ heading }) {
  return (
    <div className="w-full min-h-20 flex justify-start items-center">
      <p className="text-3xl text-gray-700 font-normal">{heading}</p>
    </div>
  );
}

export default HeadingSection;
