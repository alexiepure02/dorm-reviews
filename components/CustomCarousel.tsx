"use client";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

export default function CustomCarousel() {
  return (
    <Carousel
      // centerMode
      // centerSlidePercentage={80}
      emulateTouch
      infiniteLoop
      showStatus={false}
    >
      <img src="/university2.jpg" />
      <img src="/university2.jpg" />
      <img src="/university2.jpg" />
    </Carousel>
  );
}
