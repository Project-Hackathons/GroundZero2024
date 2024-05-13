"use client";
import React from "react";
import Card from "./Card";
import { JournalEntries, JournalEntriesType } from "@/data/JournalEntries";
import { RetrieveEntries } from "@/functions/RetrieveEntries";
import dayjs from "dayjs";

import { useEffect, useState } from "react";

const CardList = ({ setLoading }: any) => {
  const [databaseEntries, setDatabaseEntries] = useState<JournalEntriesType[]>(
    []
  );
  useEffect(() => {
    const handleRetrieveEntry = async () => {
      let data = await RetrieveEntries();
      data = data.responses;

      let response: JournalEntriesType[] = [];
      data.map((value: any) => {
        let date = value.created_at;
        date = dayjs(date).format("dddd, D MMM");
        response.push({ entry: value.entry, date: date });
      });

      setDatabaseEntries(response.reverse());
      setLoading(false);
    };
    handleRetrieveEntry();
  }, []);
  return (
    <>
      {" "}
      {databaseEntries &&
        databaseEntries.map((value, i) => {
          return <Card entry={value.entry} date={value.date} key={i + 10} />;
        })}
      {JournalEntries.map((value, i) => {
        return <Card entry={value.entry} date={value.date} key={i} />;
      })}
    </>
  );
};

export default CardList;
