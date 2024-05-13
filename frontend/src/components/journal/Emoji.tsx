"use client";
import React from "react";

import { useEffect } from "react";

const Emoji = ({ mood }: { mood: string }) => {
  useEffect(() => {
    console.log(mood);
  }, [mood]);
  const emojiMapping = {
    anger: "\u{1F621}",
    fear: "\u{1F628}",
    joy: "\u{1F604}",
    surprise: "\u{1F632}",
    sadness: "\u{1F623}",
    love: "\u{1F60D}",
  };
  const moods = mood;
  return (
    <div className="self-center">
      <p className="text-8xl">
        {
          //@ts-ignore
          emojiMapping[mood.toLowerCase()]
        }
      </p>
    </div>
  );
};

export default Emoji;
