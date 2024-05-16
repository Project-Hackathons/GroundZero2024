"use client";
import React from "react";
import ReviewHeader from "@/components/review/ReviewHeader";
import TextBlock from "@/components/review/TextBlock";
import JournalFooter from "@/components/JournalFooter";
import { useState, useEffect } from "react";
import { SummariseEvent } from "@/functions/SummariseEvent";
import LoadingScreen from "@/components/LoadingScreen";

const Page = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [review, setReview] = useState("");

  const fetchData = async () => {
    console.log("request sent");
    let data = await SummariseEvent();
    data = data.response;
    if (review === "") {
      setReview(data);
    }
    setLoading(false);
  };

  if (loading) {
    fetchData();
  }

  //   useEffect(() => {

  //   }, []);

  return (
    <div className="flex justify-center">
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-violet-800 to-violet-500 subpixel-antialiased gap-4 max-w-[450px] w-full">
        <ReviewHeader />
        <TextBlock review={review} />
        <JournalFooter />
        {loading && <LoadingScreen />}
      </div>
      {/* <div className="text-center mt-6 text-lg font-semibold hidden md:block">
        <p>
          Hey there, this application is currently not optimised for large
          screens.
        </p>
        <p>Please use your phone to see the full features of this app</p>
      </div> */}
    </div>
  );
};

export default Page;
