import React from "react";

const Advice = ({ gptResponse }: any) => {
  return (
    <div className="mx-6 font-serif antialiased text-base text-white bg-gray-600 p-4 rounded-lg">
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
      <p className="text-lg mt-4 mb-2">
        <i>Meditate</i> with us!{" "}
      </p>
      <p>
        It seems like you are feeling <b>{gptResponse.mood.toLowerCase()}</b>.
        We understand how you feel and think that you may benefit from this
        personally curated mediation track:
      </p>
      <audio
        controls
        src={`/${gptResponse.mood}.mp3`}
        className="mt-3 h-[35px]"
      >
        Your browser does not support the
        <code>audio</code> element.
      </audio>
    </div>
  );
};

export default Advice;
