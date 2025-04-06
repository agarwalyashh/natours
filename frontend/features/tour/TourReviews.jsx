import { FaStar } from "react-icons/fa";
function TourReviews({ reviews }) {
  const userNames = reviews.map((review)=>{
    return review.user.name
  })
  return (
    <div className="flex gap-8 md:gap-12 xl:gap-16 items-center flex-wrap bg-secondary-green p-4 md:p-6 xl:p-10 justify-center">
      {reviews.map((review, index) => (
        <div
          key={index}
          className="flex flex-col gap-6 items-center h-60 md:h-70 w-60 md:w-70 p-4 md:p-6 xl:p-10 bg-white rounded-sm"
        >
          <div key={index} className="flex flex-col gap-4 flex-grow">
            <span className="font-semibold uppercase">{userNames[index]}</span>
            <p className="h-30 overflow-hidden">{review.review}</p>
          </div>
          <div className="flex justify-center items-center">
            {Array.from({ length: review.rating }, (_, i) => (
              <FaStar key={i} className="text-xl text-green-600" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default TourReviews;
