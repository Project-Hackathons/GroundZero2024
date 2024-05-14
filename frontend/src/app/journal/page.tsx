"use client";
import JournalHeader from "@/components/journal/JournalHeader";
import JournalSpace from "@/components/journal/JournalSpace";
import LoadingScreen from "@/components/LoadingScreen";
import Emoji from "@/components/journal/Emoji";
import JournalFooter from "@/components/JournalFooter";

import { useState, useEffect } from "react";
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

  useEffect(() => {
    scroll();
  }, [gptResponse]);

  const scroll = () => {
    window.scrollTo({
      top: 610,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-violet-950 to-indigo-300 flex flex-col justify-start gap-3 md:hidden">
        <JournalHeader />
        <JournalSpace
          setLoadHome={setLoadHome}
          setGptResponse={setGptResponse}
        />
        {gptResponse.mood !== "" && <Emoji mood={gptResponse.mood} />}
        {gptResponse.mood !== "" && <Advice gptResponse={gptResponse} />}
        <JournalFooter />

        {loadHome && <LoadingScreen />}
      </div>
      <div className="text-center mt-6 text-lg font-semibold hidden md:block">
        <p>
          Hey there, this application is currently not optimised for large
          screens.
        </p>
        <p>Please use your phone to see the full features of this app</p>
      </div>
    </>
  );
}
