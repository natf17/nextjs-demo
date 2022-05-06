import React, { ReactChild } from "react";

export interface Props {
  sectionSm: ReactChild;
  sectionLg: ReactChild;
}

export default function MenuRow({ sectionSm, sectionLg }: Props) {
  return (
    <div className="grid grid-cols-6 gap-32 mb-11">
      <div className="col-span-6 md:col-span-2">{sectionSm}</div>
      <div className="col-span-6 md:col-span-4">{sectionLg}</div>
    </div>
  );
}
