import { CiLocationOn, CiFlag1, CiUser, CiCalendar } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { month } from "../../services/apiTours";
function Tour({ tour }) {
  const {
    id,
    name,
    difficulty,
    duration,
    price,
    maxGroupSize,
    startLocation,
    ratingsAverage,
    imageCover,
    summary,
    startDates,
    location
  } = tour;
  const image = `../public/img/tours/${imageCover}`;
  const date = new Date(startDates[0]);
  const firstName = name.split(" ")[0] + " " + name.split(" ")[1];
  const lastName = name.split(" ")[2];
  const navigate = useNavigate()
  function handleClick(tourId){
    navigate(tourId);
  }
  return (
    <div className="rounded-sm flex flex-col space-y-2 w-75 xl:w-85 relative mx-auto">
      <div className="relative clip-path-trapezoid">
        <img src={image} alt="image" className="h-60" />
        <div className="absolute inset-0 bg-gradient-to-b from-green-400 to-green-500 opacity-50"></div>
      </div>
      <div className="absolute flex flex-col justify-center items-end top-48 right-2">
        <h1 className="text-white text-2xl sm:text-3xl lg:text-4xl px-1 sm:px-2 uppercase bg-gradient-to-r from-green-500 to-green-700 opacity-80 w-fit">
          {firstName}
        </h1>
        <h1 className="text-white text-2xl sm:text-3xl lg:text-4xl px-1 sm:px-2 uppercase bg-gradient-to-r from-green-500 to-green-700 opacity-80 w-fit">
          {lastName}
        </h1>
      </div>
      <div className="p-3 sm:p-6 text-start space-y-4">
        <h1 className="uppercase font-semibold opacity-80">
          {difficulty} {duration} Day Tour
        </h1>
        <p className="italic opacity-80">{summary}</p>
        <div className="space-y-2 opacity-85">
          <div className="grid grid-cols-2 gap-4 md:gap-8">
            <div className="flex gap-2 items-center">
              <span className="mt-1">
                <CiLocationOn className="text-green-700 text-sm sm:text-xl" />
              </span>
              <span className="whitespace-nowrap">
                {startLocation.description}
              </span>
            </div>
            <div className="flex gap-2 items-center">
              <span className="mt-1">
                <CiCalendar className="text-green-700 text-sm sm:text-xl" />
              </span>
              <span className="whitespace-nowrap">
                {month[date.getMonth()]} {date.getFullYear()+4}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 md:gap-8">
            <div className="flex gap-2 items-center">
              <span className="mt-1">
                <CiFlag1 className="text-green-700 text-sm sm:text-xl" />
              </span>
              <span>{location.length}-stops</span>
            </div>
            <div className="flex gap-2 items-center">
              <span className="mt-1">
                <CiUser className="text-green-700 text-sm sm:text-xl" />
              </span>
              <span>{maxGroupSize} people</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center bg-slate-100 p-3 sm:p-6">
        <div className="flex flex-col text-start gap-2">
          <p>
            <span className="font-bold opacity-70">${price}</span>{" "}
            <span className="opacity-50">per person</span>
          </p>
          <p>
            <span className="font-bold opacity-70">{ratingsAverage}</span>{" "}
            <span className="opacity-50">rating (5)</span>
          </p>
        </div>
        <button className="rounded-full px-2 sm:px-4 h-10 sm:h-12 w-22 md:w-26 text-white bg-primary-green hover:bg-primary-green-hover cursor-pointer focus:outline-none"
        onClick={()=>handleClick(id)}>
          DETAILS
        </button>
      </div>
    </div>
  );
}

export default Tour;
