import React from "react";
import Image from "next/image";
import Link from "next/link";

const AddJournalBtn = () => {
  return (
    <div className="fixed bg-purple-800 w-20 h-20 rounded-full bottom-10 text-white flex justify-center items-center">
      <Link href="/journal">
        <Image src="/plus.svg" width={30} height={30} alt="plus" />
      </Link>
    </div>
  );
};

export default AddJournalBtn;
