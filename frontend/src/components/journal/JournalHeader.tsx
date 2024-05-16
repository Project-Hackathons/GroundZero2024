import React from "react";
import Image from "next/image";
import Link from "next/link";

const JournalHeader = () => {
  return (
    <div className="pt-10 mx-6 flex justify-between items-end">
      <h1 className="text-white text-2xl font-bold">
        What&#39;s on your mind?{" "}
      </h1>
      <Link href="/">
        <Image src="/crossIcn.svg" alt="cross" height={40} width={40} />
      </Link>
    </div>
  );
};

export default JournalHeader;
