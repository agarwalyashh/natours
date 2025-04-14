import { FaStar } from "react-icons/fa";
import { useAuth } from "../../context/authContext";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { addReview } from "../../services/apiReviews";
function TourReviews({ reviews }) {
  const userNames = reviews.map((review) => {
    return review.user.name;
  });
  const {tourId} = useParams();
  const { user } = useAuth();
  const userReview = reviews.filter((review) => review.user._id === user._id);
  const [form, showForm] = useState(false);
  const [newReview,setReview] = useState("")
  const [rating,setRating] = useState("")
  function handleReview() {
    const formData = {
      review:newReview,
      rating:rating,
      user:user._id,
      tour: tourId
    }
    addReview(formData)
    showForm(false)
  }
  return (
    <div className="bg-secondary-green flex flex-col items-center">
      <div className="flex gap-8 md:gap-12 xl:gap-16 items-center flex-wrap p-4 md:p-6 xl:p-10 justify-center">
        {reviews.map((review, index) => (
          <div
            key={index}
            className="flex flex-col gap-6 items-center h-60 md:h-70 w-60 md:w-70 p-4 md:p-6 xl:p-10 bg-white rounded-sm"
          >
            <div key={index} className="flex flex-col gap-4 flex-grow">
              <span className="font-semibold uppercase">
                {userNames[index]}
              </span>
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
      {userReview.length == 0 && (
        <div>
          <button
            onClick={() => showForm(!form)}
            className="uppercase text-white p-2 sm:px-4 sm:py-2 rounded-full bg-green-600 hover:bg-green-500 cursor-pointer w-fit mb-6"
          >
            Add a Review
          </button>
          {form && (
            <form
              className="flex flex-col gap-2 sm:gap-4 justify-center mb-5 bg-gray-200 p-6 rounded-sm"
              onSubmit={handleReview}
            >
              <textarea
                required
                className="bg-white p-1 sm:p-2 text-xs md:text-sm xl:text-lg h-16 lg:h-24 rounded-sm focus:outline-none"
                placeholder="Write a review..."
                value={newReview}
                onChange={(e)=>setReview(e.target.value)}
              />
              <input
                required
                className="bg-white p-1 sm:p-2 text-xs md:text-[15px] rounded-sm focus:outline-none"
                placeholder="Rate between 1 to 5"
                value={rating}
                onChange={(e)=>setRating(e.target.value)}
              />
              <button
                type="submit"
                className="h-10 w-12 text-white cursor-pointer hover:bg-green-500 rounded-full bg-green-600"
              >
                Add
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}

export default TourReviews;
