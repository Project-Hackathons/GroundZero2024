import React from "react";
import Link from "next/link";
import Image from "next/image";

const ReviewHeader = () => {
  return (
    <div className="w-full pt-10 px-6 self-start flex justify-start items-center">
      <h1 className="text-white text-2xl font-bold mr-2">GrowthGuardian</h1>
      <Image src="/growth.svg" alt="growth" width={30} height={30} />
      <Link href="/" className="ml-auto">
        <button className="bg-purple-800 text-white py-2 px-6 rounded-2xl font-semibold">
          Back
        </button>
      </Link>
    </div>
  );
};

export default ReviewHeader;
