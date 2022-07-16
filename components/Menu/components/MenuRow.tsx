import React, { HTMLAttributes } from "react";
import MenuItem from "./MenuItem";

import { MenuItem as MenuItemType } from "../../../pages/menu";

export interface Props {
  title: string;
  menuItems?: MenuItemType[];
}

export default function MenuRow({ title, menuItems }: Props) {
  return (
    <div className="py-4 relative">
      <h3 className="text-xl text-left p-2 text-blue-50 absolute left-2 -top-1">
        <span className="bg-slate-900 pl-2 pr-6">{title}</span>
      </h3>

      <div
        className={`
        py-10 px-4 lg:px-12
        grid gap-x-4 gap-y-4 md:gap-x-8
        grid-cols-menu auto-rows-menu
        border border-indigo-300 rounded-lg
      `}
      >
        {menuItems &&
          menuItems.map((item) => {
            return <MenuItem key={item.id} {...item} />;
          })}
      </div>
    </div>
  );
}
