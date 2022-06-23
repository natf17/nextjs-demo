import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useIdleTimerContext } from "react-idle-timer";
import Modal from "react-modal";
import localizedModal from "./../../../../root_l10ns/inactivity_modal";

type Props = {
  isOpen: boolean;
  resetKiosk: () => void;
  promptDuration: number;
};

export default function IdleUser({
  isOpen,
  resetKiosk,
  promptDuration,
}: Props) {
  const idleTimer = useIdleTimerContext();
  const [remainingTime, setRemainingTime] = useState(promptDuration);
  const { locale = "en" } = useRouter();

  // show time remaining
  useEffect(() => {
    if (!isOpen) {
      return;
    }
    // set getRemainingTime timer to update UI
    const timerId = setInterval(() => {
      const timeRemaining = Math.round(idleTimer.getRemainingTime() / 1000);
      setRemainingTime(timeRemaining);
    }, 1000);

    return () => {
      clearTimeout(timerId);
    };
  }, [idleTimer, isOpen]);

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={idleTimer.reset}
        onAfterClose={() => setRemainingTime(promptDuration)}
        style={{
          overlay: { backgroundColor: "rgba(0,0,0,0.75)", zIndex: "10" },
          content: {
            width: "30rem",
            marginLeft: "auto",
            marginRight: "auto",
            maxHeight: "40rem",
            display: "flex",
            flexDirection: "column",
            top: "30vh",
            bottom: "initial",
            borderRadius: "0.575rem",
          },
        }}
        contentLabel="Inactivity confirmation"
      >
        {/* Header */}
        <header className="py-2 px-1">
          <h1 className="text-2xl">
            {localizedModal[locale]?.header || "{HEADER}"}
          </h1>
        </header>

        {/* Body */}
        <div className="py-6 px-1 text-lg">
          <p>{localizedModal[locale]?.message || "{HEADER}"}</p>
        </div>

        {/* Footer */}
        <footer className="py-2 px-1 text-lg">
          <button
            className="bg-indigo-300 p-3 rounded-md mr-6 font-bold"
            onClick={idleTimer.reset}
          >
            {localizedModal[locale]?.extendSessionBtn || "{button_extend}"} (
            {remainingTime})
          </button>
          <button
            className="bg-red-300 p-3 rounded-md font-bold"
            onClick={resetKiosk}
          >
            {localizedModal[locale]?.resetSessionBtn || "{button_end}"}
          </button>
        </footer>
      </Modal>
    </div>
  );
}
