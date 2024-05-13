"use client";
import React, { useEffect } from "react";
import Header from "@/components/main/Header";
import AddJournalBtn from "@/components/main/AddJournalBtn";
import JournalFooter from "@/components/journal/JournalFooter";
import CardList from "@/components/main/CardList";
import { useState } from "react";
import LoadingScreen from "@/components/journal/LoadingScreen";
const page = () => {
  // eslint-disable-next-line
  const [loading, setLoading] = useState(true);
  return (
    <div className="flex flex-col items-center h-screen overflow-scroll bg-gradient-to-b from-violet-950 to-indigo-300 subpixel-antialiased gap-4">
      <Header />
      <CardList setLoading={setLoading} />
      <AddJournalBtn />
      <JournalFooter />
      {loading && <LoadingScreen />}
    </div>
  );
};

export default page;
