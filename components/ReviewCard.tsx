interface ReviewCardProps {}
import { useState } from "react";
import { Rating } from "react-simple-star-rating";

export default ({}: ReviewCardProps) => {
  const [rating, setRating] = useState(3.5);

  // Catch Rating value
  const handleRating = (rate: number) => {
    setRating(rate);

    // other logic
  };
  // Optinal callback functions
  // const onPointerEnter = () => console.log("Enter");
  // const onPointerLeave = () => console.log("Leave");
  // const onPointerMove = (value: number, index: number) =>
  //   console.log(value, index);

  return (
    <div className="flex flex-col shadow-lg rounded-2xl px-9 py-6 gap-2">
      <div className="flex gap-4">
        <img
          src="avatar.svg"
          alt="Avatar"
          className="align-middle w-12 h-12 rounded-full"
        />

        <div>
          <h1 className=" text-xl">John Doe</h1>
          <Rating
            onClick={handleRating}
            // onPointerEnter={onPointerEnter}
            // onPointerLeave={onPointerLeave}
            //onPointerMove={onPointerMove}
            initialValue={rating}
            SVGstyle={{
              display: "inline",
              width: "16px",
              height: "16px",
            }}
            transition={true}
            /* Available Props */
            SVGclassName="w-12"
            readonly={true}
            allowFraction={true}
            showTooltip={true}
            allowTitleTag={false}
          />
        </div>
      </div>
      <p className="text-lg">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged
      </p>
      <div className="flex gap-4">
        <img
          src="dorm.jpg"
          alt="Dorm"
          className="align-middle w-14 h-14 cursor-pointer"
          onClick={() => console.log("open dorm pic.")}
        />
        <img
          src="dorm.jpg"
          alt="Dorm"
          className="align-middle w-14 h-14 cursor-pointer"
          onClick={() => console.log("open dorm pic.")}
        />
        <img
          src="dorm.jpg"
          alt="Dorm"
          className="align-middle w-14 h-14 cursor-pointer"
          onClick={() => console.log("open dorm pic.")}
        />
        <img
          src="dorm.jpg"
          alt="Dorm"
          className="align-middle w-14 h-14 cursor-pointer"
          onClick={() => console.log("open dorm pic.")}
        />
      </div>
    </div>
  );
};
