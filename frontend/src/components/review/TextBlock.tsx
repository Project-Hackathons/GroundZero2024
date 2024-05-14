import React from "react";

const TextBlock = ({ review }: { review: string }) => {
  return (
    <div className="px-6 text-slate-100">
      <p className="text-lg">
        <i>Hey there 👋, we hope you are doing fine.</i>{" "}
      </p>

      <div className="rounded-lg bg-indigo-950 p-4 mt-3">
        {" "}
        <p
          className="antialiased text-sm tracking-wide leading-relaxed"
          dangerouslySetInnerHTML={{ __html: review }}
        ></p>
      </div>
    </div>
  );
};

export default TextBlock;
