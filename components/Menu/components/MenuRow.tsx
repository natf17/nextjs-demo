import React, { HTMLAttributes } from "react";
import MenuItem from "./MenuItem";

import { MenuItem as MenuItemType } from "../../../pages/menu";

export interface Props {
  title: string;
  menuItems?: MenuItemType[];
}

export default function MenuRow({ title, menuItems }: Props) {
  return (
    <div className="py-6 relative">
      <h3 className="text-3xl text-left p-2 text-blue-50 absolute left-2 -top-1">
        <span className="bg-slate-900 pl-2 pr-6">{title}</span>
      </h3>

      <div
        className={`
        p-12 pt-10
        grid gap-x-10 gap-y-2
        grid-cols-menu auto-rows-menu
        border-2 border-indigo-300 rounded-lg
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
