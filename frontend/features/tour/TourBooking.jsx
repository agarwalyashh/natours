import { useNavigate, useParams } from "react-router-dom";
import { getTour } from "../../services/apiTours";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/Loading";
import { createBooking } from "../../services/apiBookings";
import { useAuth } from "../../context/authContext";
import { toast } from "react-toastify";
import { toastStyles } from "../../utils/helper";

function TourBooking() {
  const { tourId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { data: tour, isLoading } = useQuery({
    queryKey: ["tours"],
    queryFn: () => getTour(tourId),
  });
  async function handleBooking() {
    const data = {
      tourId,
      user,
      tour,
      price: tour.price,
    };
    const res = await createBooking(data);
    if (res.status === "success") {
      toast.success("Booking Successful", toastStyles);
      navigate(-1);
    } else {
      toast.error(res.message, toastStyles);
    }
  }
  if (isLoading) return <Loading />;
  const image = `/img/tours/${tour.imageCover}`;
  return (
    <div className="my-10 mx-auto w-[50%] space-y-6">
      <h1 className="uppercase text-green-500 text-center font-semibold text-xl sm:text-2xl md:text-3xl lg:text-4xl">
        {tour.name}
      </h1>
      <img
        src={image}
        alt="image"
        className="object-cover h-60 sm:h-80 mx-auto"
      />
      <p className="text-lg md:text-xl lg:text-2xl text-green-500 text-center">
        Total Price: <span className="font-semibold">{tour.price}</span>
      </p>
      <div className="flex justify-center">
        <button
          className="text-white cursor-pointer px-4 py-2 bg-secondary-green rounded-sm hover:bg-green-600"
          onClick={handleBooking}
        >
          CONFIRM BOOKING
        </button>
      </div>
      <h1 className="uppercase text-green-500 text-center font-semibold text-lg sm:text-xl md:text-2xl lg:text-3xl">
        Book Now, Pay Later.
      </h1>
    </div>
  );
}

export default TourBooking;
