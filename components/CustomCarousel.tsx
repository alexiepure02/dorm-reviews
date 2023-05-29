"use client";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { ReactChild, ReactElement, ReactNode } from "react";

interface CustomCarouselProps {
  selectedItem?: number;
  onChange?: (index: number) => void;
  emulateTouch?: boolean;
  infiniteLoop?: boolean;
  showIndicators?: boolean;
  showArrows?: boolean;
  showThumbs?: boolean;
  dynamicHeight?: boolean;
  onClickItem?: (index: number) => void;
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
  onClickItem,
  children,
}: CustomCarouselProps) {
  const renderItem = (
    item: any,
    options?:
      | {
          isSelected: boolean;
          isPrevious: boolean;
        }
      | undefined
  ) => {
    return onClickItem ? (
      <div onClick={() => onClickItem(item?.key)} className="cursor-pointer">
        {item}
      </div>
    ) : (
      item
    );
  };

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
      renderThumbs={onClickItem && customRenderThumbs}
      showStatus={false}
      dynamicHeight={dynamicHeight}
      renderItem={renderItem}
    >
      {children}
    </Carousel>
  );
}
