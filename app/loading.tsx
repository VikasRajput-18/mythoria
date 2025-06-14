import React from "react";
import { MultiStepLoader } from "../components/multi-step-loader";

const loadingStates = [
  { text: "Summoning your next masterpiece..." },
  { text: "Sharpening the quills & pixels..." },
  { text: "Brewing a plot twist 🌀" },
  { text: "Waking up dragons & elves 🐉✨" },
  { text: "Flipping secret pages..." },
  { text: "Casting story spells 🔮" },
  { text: "Binding magic into chapters..." },
  { text: "Ready to blow your mind 💥" },
];

export default function Loading() {
  return (
    <div className="w-full h-screen bg-mystic-800 flex items-center justify-center">
      <MultiStepLoader
        loadingStates={loadingStates}
        loading={true}
        duration={2000}
      />
    </div>
  );
}
