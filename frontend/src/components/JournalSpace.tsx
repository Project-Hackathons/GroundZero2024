import { Button } from "@chakra-ui/react";
const JournalSpace = () => {
  const journalPrompts = [
    "What are three things you're grateful for today, and why?",
    "Describe a recent challenge you faced and how you overcame it.",
    "Reflect on a mistake you made recently. What did you learn from it?",
    "Write about a person who has had a significant impact on your life.",
    "If you could travel anywhere in the world, where would you go and why?",
    "Describe your ideal day from start to finish.",
    "Write about a book or movie that deeply resonated with you and why.",
    "What are your top three values, and how do they influence your daily life?",
    "Reflect on a time when you felt proud of yourself and what you accomplished.",
    "Write a letter to your future self, detailing your hopes and aspirations.",
    "Describe a place from your past that holds special memories for you.",
    "What is one habit you would like to develop or change, and why?",
    "Write about a recent act of kindness you witnessed or experienced.",
    "Reflect on a moment when you felt truly at peace with yourself and the world around you.",
    "What does success mean to you, and how do you measure it in your life?",
    "Describe a dream or goal you have for your future, and brainstorm steps to achieve it.",
    "Write about a time when you had to step out of your comfort zone. What did you learn?",
    "Reflect on a difficult decision you had to make recently. How did you navigate it?",
    "What role does self-care play in your life, and how do you practice it?",
    "Write about something you're passionate about and why it's important to you.",
  ];

  const returnPrompt = () => {
    function getRandomInt(max: number) {
      return Math.floor(Math.random() * max);
    }
    return journalPrompts[getRandomInt(journalPrompts.length)];
  };
  return (
    <div className="flex flex-col items-center h-[400px] gap-5">
      <textarea
        className="w-[90%] border-[1px] h-[40000px] border-green-950 rounded p-4"
        placeholder={returnPrompt()}
      ></textarea>
      <Button variant="outline" className="border-green-500">
        Submit
      </Button>
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
