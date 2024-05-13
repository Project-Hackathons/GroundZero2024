import JournalHeader from "@/components/JournalHeader";
import JournalSpace from "@/components/JournalSpace";

export default function Home() {
  return (
    <div className="h-screen p-6 overflow-scroll bg-gradient-to-b from-violet-950 to-indigo-300 flex flex-col gap-3">
      <JournalHeader />
      <JournalSpace />
    </div>
  );
}
