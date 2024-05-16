"use client";
import { AnalyseJournal } from "@/functions/AnalyseJournal";
import Image from "next/image";
import { journalPrompts } from "@/data/JournalPrompts";
import { useState, useEffect } from "react";
import LoadingScreen from "../LoadingScreen";
import { MorePrompts } from "@/functions/MorePrompts";
import { PostEntry } from "@/functions/Postentry";

const JournalSpace = ({ setLoadHome, setGptResponse }: any) => {
  const [journalEntry, setJournalEntry] = useState<string>("");
  const [prompt, setPrompt] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState(false);
  useEffect(() => {
    function getRandomInt(max: number) {
      return Math.floor(Math.random() * max);
    }
    const returnPrompt = () => {
      return journalPrompts[getRandomInt(journalPrompts.length)];
    };
    setPrompt(() => returnPrompt());
  }, []);

  const handleSubmit = async () => {
    if (submitted) {
      return;
    }
    setLoadHome(true);
    PostEntry(journalEntry.replaceAll("\n", "<br/>"));
    const data = await AnalyseJournal(journalEntry);
    setGptResponse(data.response);
    console.log(data.response);
    setLoadHome(false);
    setSubmitted(true);
  };

  const handlePrompt = async () => {
    setLoading(true);
    console.log(journalEntry.replaceAll("\n", "<br/>"));
    const data = await MorePrompts(journalEntry);
    setPrompt(data.response);
    setLoading(false);
  };

  return (
    <div className="mx-6 h-fit flex flex-col items-center gap-5">
      <div className="w-full h-fit bg-indigo-950 flex flex-col text-white text-sm rounded-xl relative">
        {loading && <LoadingScreen />}
        <div className="flex flex-col pb-4">
          <p className="p-3 antialiased">{`🚀 RocketCoach says: ${prompt}`}</p>
          <button
            className="bg-purple-800 text-white py-1 px-4 rounded-2xl font-semibold leading-5 flex items-center gap-2 w-fit self-center "
            onClick={handlePrompt}
          >
            <Image src="aiIcn.svg" alt="ai" width={23} height={23} />
            SmartAssist
          </button>
        </div>
        <textarea
          className="bg-inherit w-full h-[400px] rounded-xl rounded-t-none border-t-[1px] border-gray-400 p-4 resize-none outline-none text-white caret-indigo-600"
          placeholder="Start Writing..."
          value={journalEntry}
          onChange={(e) => {
            setJournalEntry(e.target.value);
          }}
        />
      </div>
      <div className="flex justify-between w-auto gap-4 items-center text-sm">
        <button
          className="bg-purple-800 text-white py-2 px-4 h-fit rounded-2xl font-semibold flex items-center gap-2"
          onClick={handleSubmit}
        >
          <Image src="instant.svg" alt="instant" width={21} height={21} />
          InstantInsight
        </button>
      </div>
    </div>
  );
};

export default JournalSpace;
