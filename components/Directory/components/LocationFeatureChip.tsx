import React from "react";

type Props = {
  disabled?: boolean;
  children: React.ReactNode;
};

export default function LocationFeatureChip({
  disabled = false,
  children,
}: Props) {
  return (
    <div
      className={`
        inline-block px-1 border rounded-xl
        bg-slate-700 border-blue-500 text-blue-100
        ${disabled && `bg-slate-200 text-slate-400 border-slate-500`}
      `}
    >
      {children}
    </div>
  );
}
