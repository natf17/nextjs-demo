import React from "react";
import EndSession from "./EndSession";

export default function StickyFooter() {
  return (
    <div
      className="fixed w-screen h-16 bg-black bg-opacity-10 z-10 flex justify-center"
      style={{ bottom: "0", left: "0", right: "0" }}
    >
      <EndSession />
    </div>
  );
}
