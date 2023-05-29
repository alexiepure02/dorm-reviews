"use client";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { PropsWithChildren, ReactChild, ReactElement, ReactNode } from "react";

interface CustomCarouselProps {
  selectedItem?: number;
  onChange?: (index: number) => void;
  emulateTouch?: boolean;
  infiniteLoop?: boolean;
  showIndicators?: boolean;
  showArrows?: boolean;
  showThumbs?: boolean;
  dynamicHeight?: boolean;
  children: any; // won't work for ReactNode, and asks for ReactChild[] which is deprecated
}

const customRenderThumbs = (children: any[]): ReactChild[] =>
  children.map((item: any, index: number) => (
    <img
      key={index}
      alt={"Thumb " + index}
      src={item.props.src}
      className=" object-cover max-h-12"
    />
  ));

export default function CustomCarousel({
  selectedItem,
  onChange,
  emulateTouch = true,
  infiniteLoop = true,
  showIndicators = true,
  showArrows = true,
  showThumbs = true,
  dynamicHeight = false,
  children,
}: CustomCarouselProps) {
  return (
    <Carousel
      // centerMode
      // centerSlidePercentage={80}
      selectedItem={selectedItem}
      onChange={onChange}
      emulateTouch={emulateTouch}
      infiniteLoop={infiniteLoop}
      showIndicators={showIndicators}
      showArrows={showArrows}
      showThumbs={showThumbs}
      renderThumbs={customRenderThumbs}
      showStatus={false}
      dynamicHeight={dynamicHeight}
    >
      {children}
    </Carousel>
  );
}
