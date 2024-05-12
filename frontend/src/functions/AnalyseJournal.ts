"use client";
<<<<<<< HEAD
export async function AnalyseJournal(journalEntry: string) {
  const url = "http://localhost:8000/entry-analysis";
  const formData = new FormData();
  formData.append("entry", journalEntry);
=======
export async function AnalyseJournal() {
  const url = "http://localhost:8000/entry-analysis";
  const formData = new FormData();
  formData.append("entry", "hello");
>>>>>>> 61201c3 (push)

  const response = await fetch(url, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await response.json();
  console.log(data);
  return data;
}
