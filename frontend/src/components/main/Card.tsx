import React from "react";
import { JournalEntriesType } from "@/data/JournalEntries";

type CardType = JournalEntriesType & {
  key: number;
};

const Card = ({ entry, date, key }: CardType) => {
  return (
    <div
      key={key}
      className="bg-slate-500 w-[90%] h-[30%] rounded-2xl opacity-75 flex flex-col"
    >
      <div className="leading-[19px] antialiased text-white h-[85%] px-3 py-4 text-ellipsis overflow-hidden font-medium">
        <p dangerouslySetInnerHTML={{ __html: entry }}></p>
      </div>
      <div className="h-[15%] px-3 py-2 border-t-[1px] border-gray-400 text-sm text-slate-200 font-medium">
        {date}
      </div>
    </div>
  );
};

export default Card;
