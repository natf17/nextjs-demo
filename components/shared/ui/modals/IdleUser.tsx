import React from "react";
import Modal from "react-modal";

export default function IdleUser() {
  return (
    <div>
      <Modal
        isOpen={true}
        style={{
          overlay: { backgroundColor: "rgba(0,0,0,0.75)" },
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
          <button className="bg-indigo-300 p-3 rounded-md mr-6 font-bold">
            I&apos;m still here (X)
          </button>
          <button className="bg-red-300 p-3 rounded-md font-bold">
            End session
          </button>
        </footer>
      </Modal>
    </div>
  );
}
