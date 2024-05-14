import React from "react";
import Link from "next/link";

const ReviewHeader = () => {
  return (
    <div className="w-full pt-10 px-6 self-start flex justify-between">
      <h1 className="text-white text-3xl font-bold">Review</h1>
      <Link href="/">
        <button className="bg-purple-800 text-white py-2 px-6 rounded-2xl font-semibold">
          Back
        </button>
      </Link>
    </div>
  );
};

export default ReviewHeader;
