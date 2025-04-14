import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../context/authContext";
import { getReviews } from "../../services/apiReviews";
import Loading from "../../components/Loading";
function Reviews() {
  const { user } = useAuth();
  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ["reviews"],
    queryFn: getReviews,
  });
  if (isLoading) return <Loading />;
  const userReviews = reviews.filter((review) => review.user._id === user._id);
  return (
    <main className="p-10 md:p-14">
      <div className="flex flex-wrap gap-4">
        {userReviews.length > 0 &&
          userReviews.map((review, index) => (
            <div key={index}>
              {review.tour && (
                <div className="bg-gray-200 rounded-sm p-4 space-y-2 text-sm md:text-lg">
                  <h1 className="font-semibold">{review.tour?.name}</h1>
                  <h1>{review.review}</h1>
                  <h1>Rating: <span className="font-bold">{review.rating}</span></h1>
                  <p className="underline text-green-500 text-right cursor-pointer hover:text-green-600 text-xs sm:text-sm">Edit</p>
                </div>
              )}
            </div>
          ))}
          {userReviews.length==0 && <h1 className="text-center text-red-400">You have no reviews</h1>}
      </div>
    </main>
  );
}

export default Reviews;
