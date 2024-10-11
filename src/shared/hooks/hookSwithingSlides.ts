import { useState } from 'react';

// Hook for switching slides
const useSwitchingSlide = (firstSlide: number, lastSlide: number) => {
  const [slide, setSlide] = useState(firstSlide);

  // Function to switch one slide back
  const onSlideDown = () => {
    if (slide === firstSlide) {
      setSlide(lastSlide);
    } else {
      setSlide(slide - 1);
    }
  };

  // Function to switch one slide forward
  const onSlideUp = () => {
    if (slide >= 0 && slide < lastSlide) {
      setSlide(slide + 1);
    } else {
      setSlide(firstSlide);
    }
  };

  return {
    slide,
    setSlide,
    onSlideDown,
    onSlideUp,
  };
};

export default useSwitchingSlide;
