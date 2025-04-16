import { star_fullfill, star_notfill } from "@/assets/icons/home_page_icons";
import React from "react";

interface RatingStarProps {
  numofStar: number;
}

const RatingStar: React.FC<RatingStarProps> = ({ numofStar }) => {
  const filledStars = Array.from({ length: numofStar }, (_, index) => (
    <img key={index} src={star_fullfill} alt="star" className="size-2.5" />
  ));

  const emptyStars = Array.from({ length: 5 - numofStar }, (_, index) => (
    <img key={index + numofStar} src={star_notfill} alt="empty star" className="size-2.5" />
  ));

  return (
    <div className="flex flex-row flex-wrap">
      {filledStars}
      {emptyStars}
    </div>
  );
};

export default RatingStar;
