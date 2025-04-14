import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useAuth } from "../../context/authContext";
import Loading from "../../components/Loading";

function Bookings() {
  const { data = [], isLoading } = useQuery({
    queryKey: ["bookings"],
    queryFn: getBookings,
  });
  const { user } = useAuth();
  if (isLoading) return <Loading />;
  const userBookings = data?.filter((booking) => booking.user._id === user._id);
  return (
    <main className="p-10 md:p-14">
      <div className="flex flex-wrap gap-4">
        {userBookings.length > 0 &&
          userBookings.map((booking, index) => (
            <div key={index}>
              {booking.tour && (
                <div className="bg-gray-200 rounded-sm p-4 space-y-2 text-sm md:text-lg">
                  <h1 className="font-semibold">{booking.tour.name}</h1>
                  <h1>
                    Price :{" "}
                    <span className="text-green-500 font-semibold">
                      {booking.price}
                    </span>
                  </h1>
                </div>
              )}
            </div>
          ))}
        {userBookings.length == 0 && (
          <h1 className="text-center text-red-400">You have no reviews</h1>
        )}
      </div>
    </main>
  );
}

export default Bookings;
