import React from "react";
import { JournalEntriesType } from "@/data/JournalEntries";
import Image from "next/image";

type CardType = JournalEntriesType & {
  key: number;
};

const Card = ({ entry, date, key }: CardType) => {
  return (
    <div
      key={key}
      className="bg-slate-500 w-[90%] rounded-2xl opacity-75 flex flex-col"
    >
      <div className="leading-[19px] antialiased text-white max-h-[210px] px-3 pr-1 py-4 text-ellipsis overflow-hidden font-medium">
        <p dangerouslySetInnerHTML={{ __html: entry }}></p>
      </div>
      <div className="h-[38px] px-3 py-2 border-t-[1px] border-gray-400 text-sm text-slate-200 font-medium flex justify-between">
        {date}
        <Image src="/arrow.svg" alt="arrow" height={25} width={25} />
      </div>
    </div>
  );
};

export default Card;
