import React, { useEffect, useState } from "react";
import { useIdleTimerContext } from "react-idle-timer";
import Modal from "react-modal";

type Props = {
  isOpen: boolean;
  resetKiosk: () => void;
};

export default function IdleUser({ isOpen, resetKiosk }: Props) {
  const idleTimer = useIdleTimerContext();
  const [remainingTime, setRemainingTime] = useState(
    idleTimer.getRemainingTime()
  );

  // show time remaining
  useEffect(() => {
    // set getRemainingTime timer to update UI
    const timerId = setInterval(() => {
      setRemainingTime(Math.floor(idleTimer.getRemainingTime() / 1000));
    }, 1000);

    // cleanup
    return () => {
      clearTimeout(timerId);
    };
  }, [idleTimer]);

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={idleTimer.reset}
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
          <h1 className="text-2xl">Are you still there?</h1>
        </header>

        {/* Body */}
        <div className="py-6 px-1 text-lg">
          <p>Your session will end automatically.</p>
        </div>

        {/* Footer */}
        <footer className="py-2 px-1 text-lg">
          <button
            className="bg-indigo-300 p-3 rounded-md mr-6 font-bold"
            onClick={idleTimer.reset}
          >
            I&apos;m still here ({remainingTime})
          </button>
          <button
            className="bg-red-300 p-3 rounded-md font-bold"
            onClick={resetKiosk}
          >
            End session
          </button>
        </footer>
      </Modal>
    </div>
  );
}
