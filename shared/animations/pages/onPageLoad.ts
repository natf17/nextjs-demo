// define page animations for when a page loads

const MotionFadeEnter = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const MotionSlideUp = {
  initial: { opacity: 0, y: 90 },
  animate: { opacity: 1, y: 0 },
  transition: { type: "tween" },
  exit: { opacity: 0, y: 90 },
};

export { MotionFadeEnter, MotionSlideUp };
