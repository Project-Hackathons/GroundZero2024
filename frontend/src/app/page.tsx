import React from "react";
import Header from "@/components/main/Header";
import Card from "@/components/main/Card";
import { JournalEntries } from "@/data/JournalEntries";
import AddJournalBtn from "@/components/main/AddJournalBtn";

const page = () => {
  return (
    <div className="flex flex-col items-center h-screen overflow-scroll bg-gradient-to-b from-violet-950 to-indigo-300 subpixel-antialiased gap-4">
      <Header />
      {JournalEntries.map((value, i) => {
        return <Card entry={value.entry} date={value.date} key={i} />;
      })}
      <AddJournalBtn />
    </div>
  );
};

export default page;
