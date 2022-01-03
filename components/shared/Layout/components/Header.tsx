import React from "react";
import Image from "next/image";
import Link from "next/link";
import LanguagePicker from "./LanguagePicker";
import { useRouter } from "next/router";
import BackButton from "./BackButton";

type Props = {
  src: string;
  width: number;
  height: number;
};

export default function Header({ src, width, height }: Props) {
  const router = useRouter();

  return (
    <div
      className="overflow-hidden h-16
      grid w-full grid-cols-navBar
      px-10 max-w-7xl m-auto
      border-b border-indigo-300      
    "
    >
      {/* To include text: we need some way to make this dynamic, i.e.
      to refresh this information when site language
      changes, etc. */}

      {/* Region left */}
      <div className="flex">
        <BackButton />
      </div>

      {/* Region center (logo) */}
      <Link href="/">
        <a className="flex justify-center align-middle">
          <Image
            src={src}
            alt="logo"
            width={width}
            height={height}
            layout={"intrinsic"}
          />
        </a>
      </Link>

      {/* Region right */}
      <div className="flex flex-row-reverse">
        <LanguagePicker />
      </div>
    </div>
  );
}
