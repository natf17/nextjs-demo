import React from "react";
import Link from "next/link";
import Image from "next/image";

import { MenuItem as MenuItemType } from "../../../pages/menu";

export default function MenuItem(item: MenuItemType) {
  return (
    <Link href={item.url}>
      <a
        className="
          flex flex-col 
          p-1 bg-black bg-opacity-50 text-gray-200
          border border-solid border-blue-200"
      >
        {/* Container sizing */}
        <div
          className="h-2/3 overflow-hidden
            flex justify-center items-center
          "
        >
          {item.image && (
            // Center/alignment container
            <div
              className="w-20 h-20 overflow-hidden relative
                  flex justify-center items-center
                "
            >
              <Image
                src={`${
                  process.env.NEXT_PUBLIC_VERCEL_IMG_API + item.image.url
                }`}
                alt=""
                width={item.image.width} // insert dimensions, should be sq
                height={item.image.height}
              />
            </div>
          )}
        </div>

        {/* Image label */}
        <div
          className="
              h-1/3 overflow-hidden text-center 
              flex justify-center items-center
              uppercase text-xl
            "
        >
          {item.label}
        </div>
      </a>
    </Link>
  );
}
