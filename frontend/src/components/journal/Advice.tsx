import React from "react";

const Advice = ({ gptResponse }: any) => {
  return (
    <div className="mx-6 font-serif antialiased text-base">
      <p className="text-lg font-semibold">Hey there &#128075;</p>
      <br />
      <p>{gptResponse.advice}</p>
      <p className="text-lg mt-4 mb-2">
        <i>Consider</i> doing the following:{" "}
      </p>
      <ul className="list-disc list-inside">
        <li>{gptResponse.activity1}</li>
        <li className="my-3">{gptResponse.activity2}</li>
        <li>{gptResponse.activity3}</li>
      </ul>
    </div>
  );
};

export default Advice;
