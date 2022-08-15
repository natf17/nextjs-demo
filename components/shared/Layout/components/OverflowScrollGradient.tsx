import React from "react";

type Props = {
  children: React.ReactNode;
  gradientHeight: string;
  twTargetFadeColor: string;
};

function OverflowScrollGradient({
  children,
  gradientHeight,
  twTargetFadeColor,
}: Props) {
  return (
    <div
      className={`relative w-full 
      before:absolute after:absolute
      before:top-0 after:bottom-0
      before:w-full after:w-full
      before:h-[${gradientHeight}] after:h-[${gradientHeight}]
      before:pointer-events-none after:pointer-events-none
      
      before:bg-gradient-to-t before:from-transparent before:to-${twTargetFadeColor}
      after:bg-gradient-to-b after:from-transparent after:to-${twTargetFadeColor}      
    `}
    >
      {children}
    </div>
  );
}

export default OverflowScrollGradient;
