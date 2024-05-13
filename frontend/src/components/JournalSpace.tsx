"use client";
import { AnalyseJournal } from "@/functions/AnalyseJournal";
import Image from "next/image";
import { journalPrompts } from "@/data/JournalPrompts";
import { useState, useEffect } from "react";
const JournalSpace = () => {
  const [journalEntry, setJournalEntry] = useState<string>("");
  const [prompt, setPrompt] = useState<string>();
  useEffect(() => {
    function getRandomInt(max: number) {
      return Math.floor(Math.random() * max);
    }
    const returnPrompt = () => {
      return journalPrompts[getRandomInt(journalPrompts.length)];
    };
    setPrompt(() => returnPrompt());
  }, []);

  const handleSubmit = () => {
    AnalyseJournal(journalEntry);
    //setJournalEntry to none
    //start loading
  };

  return (
    <div className="flex flex-col items-center h-[400px] gap-5">
      <div className="w-full bg-indigo-950 flex flex-col text-white text-sm rounded">
        <p className="p-3 antialiased">{`AI Prompt: ${prompt}`}</p>
        <textarea
          className="bg-inherit w-full h-[400px] rounded rounded-t-none border-t-[1px] border-gray-400 p-4 resize-none outline-none text-white caret-indigo-600"
          placeholder="Start Writing..."
          value={journalEntry}
          onChange={(e) => {
            setJournalEntry(e.target.value);
          }}
        />
      </div>
      <div className="flex flex-between w-auto gap-4 items-center">
        <button
          className="bg-purple-800 text-white py-2 px-6 rounded-2xl font-semibold leading-5 flex items-center gap-2 "
          onClick={() => console.log(journalEntry)}
        >
          <Image src="aiIcn.svg" alt="ai" width={25} height={25} />
          Prompt!
        </button>
        <button
          className="bg-purple-800 text-white py-2 px-6 h-fit rounded-2xl font-semibold"
          onClick={() => handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default JournalSpace;

// "use client";
// export async function AnalyseJournal() {
//   const url = "http://localhost:8000/entry-analysis";
//   const formData = new FormData();
//   formData.append("entry", "hello");

//   const response = await fetch(url, {
//     method: "POST",
//     body: formData,
//   });

//   if (!response.ok) {
//     throw new Error("Failed to fetch data");
//   }
//   const data = await response.json();
//   console.log(data);
//   return data;
// }
