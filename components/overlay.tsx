import React from "react";
import Spinner from "./spinner";

const Overlay = () => {
  return (
    <div className="fixed inset-0 z-[9999] bg-mystic-800/70 animate-pulse flex items-center justify-center">
      <Spinner className="w-10 h-10 md:w-20 md:h-20" />
    </div>
  );
};

export default Overlay;
