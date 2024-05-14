import React from "react";
import { Spinner } from "@chakra-ui/react";

const LoadingScreen = () => {
  return (
    <div className="absolute bg-slate-700 w-full max-w-[450px] h-full opacity-60 z-10 flex justify-center items-center">
      <Spinner size="lg" thickness="8px" />
    </div>
  );
};

export default LoadingScreen;
