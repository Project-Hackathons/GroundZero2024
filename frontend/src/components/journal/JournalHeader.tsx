import React from "react";
import Image from "next/image";
import Link from "next/link";

const JournalHeader = () => {
  return (
    <div className="pt-10 mx-6 flex justify-between items-end">
      <h1 className="text-white text-3xl font-bold">Entry</h1>
      <Link href="/">
        <Image src="/crossIcn.svg" alt="cross" height={40} width={40} />
      </Link>
    </div>
  );
};

export default JournalHeader;
