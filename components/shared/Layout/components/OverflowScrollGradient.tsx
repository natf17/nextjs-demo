import React from "react";

type Props = {
  children: React.ReactNode;
  twGradientHeightBefore: string;
  twGradientHeightAfter: string;
  twTargetFadeColorBefore: string;
  twTargetFadeColorAfter: string;
};

function OverflowScrollGradient({
  children,
  twGradientHeightBefore,
  twGradientHeightAfter,
  twTargetFadeColorBefore,
  twTargetFadeColorAfter,
}: Props) {
  return (
    <div
      className={`relative w-full z-10
      before:z-10 after:z-10
      before:absolute after:absolute
      before:top-0 after:bottom-0
      before:w-full after:w-full
      ${twGradientHeightBefore} ${twGradientHeightAfter}
      before:pointer-events-none after:pointer-events-none      
      before:bg-gradient-to-t before:from-transparent ${twTargetFadeColorBefore}
      after:bg-gradient-to-b after:from-transparent ${twTargetFadeColorAfter}  
    `}
    >
      {children}
    </div>
  );
}

export default OverflowScrollGradient;
