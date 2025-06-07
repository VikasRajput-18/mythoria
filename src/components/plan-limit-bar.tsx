import React from "react";

const PlanLimitBar = ({ uploaded = 6, max = 10 }) => {
  const progress = Math.min((uploaded / max) * 100, 100); // ensure max 100%

  return (
    <div className="md:ml-[300px] bg-mystic-800 fixed bottom-0 md:border-0 border-t border-t-mystic-600 shadow-2xl md:shadow-none md:border-t-mystic-800 left-0 right-0 py-2 px-4 md:px-8 space-y-2">
      <div className="flex items-center justify-between gap-2">
        <p className="text-white font-semibold md:text-lg">Free Plan Limits</p>
        <p className="text-white ">6/10 stories uploaded</p>
      </div>
      <div className="w-full h-2 bg-mystic-600 rounded-md relative overflow-hidden">
        <div
          className="bg-white absolute left-0 top-0 h-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-mystic-500">
        You can upload up to 10 stories on the free plan
      </p>
    </div>
  );
};

export default PlanLimitBar;
