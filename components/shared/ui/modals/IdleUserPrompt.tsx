import { useRouter } from "next/router";
import React, { useEffect, useState, useRef } from "react";
import { useIdleTimerContext } from "react-idle-timer";
import Modal from "react-modal";
import localizedModal from "../../../../root_l10ns/inactivity_modal";

type Props = {
  isOpen: boolean;
  resetKiosk: () => void;
  closeModal: () => void;
  promptDuration: number;
};

export default function IdleUserPrompt({
  isOpen,
  resetKiosk,
  promptDuration,
  closeModal,
}: Props) {
  const idleTimer = useIdleTimerContext();
  const [remainingTime, setRemainingTime] = useState(promptDuration);
  const { locale = "en" } = useRouter();

  // store timer in a ref
  const idleCountdown = useRef<NodeJS.Timer | null>(null);

  // show time remaining
  useEffect(() => {
    console.log(
      `idleUser (modal component) useEffect fired [idleTimer, isOpen ${isOpen}]`
    );
    // modal is closed
    if (!isOpen) {
      // clear ref timer
      idleCountdown.current && clearInterval(idleCountdown.current);
    }

    // modal opened
    if (isOpen) {
      // check timer
      if (!idleCountdown.current) {
        // create new timer, store in ref
        idleCountdown.current = setInterval(() => {
          const timeRemaining = Math.round(idleTimer.getRemainingTime() / 1000);
          setRemainingTime(timeRemaining);
        }, 1000);
      } else {
        // timer already exists, clear and reset
        clearInterval(idleCountdown.current);
        // TODO: Repeated code!
        idleCountdown.current = setInterval(() => {
          const timeRemaining = Math.round(idleTimer.getRemainingTime() / 1000);
          setRemainingTime(timeRemaining);
        }, 1000);
      }
    }

    return () => {
      if (idleCountdown.current) {
        clearInterval(idleCountdown.current);
      }
    };
  }, [idleTimer, isOpen]);

  const resetTimerAndCloseModal = () => {
    idleTimer.reset();
    closeModal();
  };

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={resetTimerAndCloseModal}
        onAfterClose={() => setRemainingTime(promptDuration)}
        style={{
          overlay: { backgroundColor: "rgba(0,0,0,0.75)", zIndex: "10" },
          content: {
            width: "25rem",
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
          <h1 className="text-xl">
            {localizedModal[locale]?.header || "{HEADER}"}
          </h1>
        </header>

        {/* Body */}
        <div className="py-6 px-1 text-base">
          <p>{localizedModal[locale]?.message || "{HEADER}"}</p>
        </div>

        {/* Footer */}
        <footer className="py-2 px-1 text-sm">
          <button
            className="bg-indigo-300 p-2 px-3 rounded-md mr-6 font-bold"
            onClick={resetTimerAndCloseModal}
          >
            {localizedModal[locale]?.extendSessionBtn || "{button_extend}"} (
            {remainingTime})
          </button>
          <button
            className="bg-red-300 p-2 px-3 rounded-md font-bold"
            onClick={resetKiosk}
          >
            {localizedModal[locale]?.resetSessionBtn || "{button_end}"}
          </button>
        </footer>
      </Modal>
    </div>
  );
}
