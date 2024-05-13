"use client";
import JournalHeader from "@/components/journal/JournalHeader";
import JournalSpace from "@/components/journal/JournalSpace";
import LoadingScreen from "@/components/journal/LoadingScreen";
import Emoji from "@/components/journal/Emoji";
import JournalFooter from "@/components/journal/JournalFooter";

import { useState } from "react";
import Advice from "@/components/journal/Advice";

type gptResponseType = {
  mood: string;
  advice: string;
  activity1: string;
  activity2: string;
  activity3: string;
};

export default function Home() {
  const [loadHome, setLoadHome] = useState<boolean>(false);
  const [gptResponse, setGptResponse] = useState<gptResponseType>({
    mood: "",
    advice: "",
    activity1: "",
    activity2: "",
    activity3: "",
  });

  return (
    <div className="h-screen overflow-scroll bg-gradient-to-b from-violet-950 to-indigo-300 flex flex-col justify-start gap-3">
      <JournalHeader />
      <JournalSpace setLoadHome={setLoadHome} setGptResponse={setGptResponse} />
      {gptResponse.mood !== "" && <Emoji mood={gptResponse.mood} />}
      {gptResponse.mood !== "" && <Advice gptResponse={gptResponse} />}
      <JournalFooter />

      {loadHome && <LoadingScreen />}
    </div>
  );
}
