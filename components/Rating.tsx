import { Rating } from "react-simple-star-rating";

interface RatingProps {
  initialValue: number;
  readonly?: boolean;
  showTooltip?: boolean;
  onClick?: () => void;
}
export default ({
  initialValue,
  readonly = true,
  showTooltip,
  onClick,
}: RatingProps) => {
  // Optinal callback functions
  // const onPointerEnter = () => console.log("Enter");
  // const onPointerLeave = () => console.log("Leave");
  // const onPointerMove = (value: number, index: number) =>
  //   console.log(value, index);

  return (
    <Rating
      initialValue={initialValue}
      SVGclassName="w-4 w-4 inline"
      readonly={readonly}
      allowFraction={true}
      allowTitleTag={false}
      showTooltip={showTooltip}
      tooltipClassName="text-center w-14"
    />
  );
};
