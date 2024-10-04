import ReviewPhoto from "@/public/reviewPhotos/teachers.png"
import { StaticImageData } from "next/image";

export type Reviews = {
    id: string;
    author: string;
    reviewText: string,
    src: StaticImageData;
    rating: number;
    date: string;
  };

  const ReviewArray : Reviews[] = [
    {
        id: "1",
        author: "Narmin Hussain",
        src: ReviewPhoto,
        rating: 4,
        reviewText: "Easy same day appointment and was able to pick up my prescription within an hour of finishing my visit. Highly recommend",
        date: "September 27,2024",

      },
      {
        id: "2",
        author: "Jane Doe",
        src: ReviewPhoto,
        rating: 4,
        reviewText: "Easy same day appointment and was able to pick up my prescription within an hour of finishing my visit. Highly recommend",
        date: "September 27,2024",
      },
      
  ]

  export default ReviewArray;