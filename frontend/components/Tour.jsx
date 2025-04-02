import { CiLocationOn, CiFlag1, CiUser, CiCalendar } from "react-icons/ci";
const month = {
  0: "January",
  1: "February",
  2: "March",
  3: "April",
  4: "May",
  5: "June",
  6: "July",
  7: "August",
  8: "September",
  9: "October",
  10: "November",
  11: "December",
};
function Tour({ tour }) {
  const {
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
  return (
    <div className="rounded-sm flex flex-col space-y-2 w-85 relative">
      <div className="relative clip-path-trapezoid">
        <img src={image} alt="image" className="h-60" />
        <div className="absolute inset-0 bg-gradient-to-b from-green-400 to-green-500 opacity-50"></div>
      </div>
      <div className="absolute flex flex-col justify-center items-end top-48 right-2">
        <h1 className="text-white text-4xl px-2 uppercase bg-gradient-to-r from-green-500 to-green-700 opacity-80 ">
          {firstName}
        </h1>
        <h1 className="text-white text-4xl px-2 uppercase bg-gradient-to-r from-green-500 to-green-700 opacity-80 w-fit">
          {lastName}
        </h1>
      </div>
      <div className="p-6 text-start space-y-4">
        <h1 className="uppercase font-semibold opacity-80">
          {difficulty} {duration} Day Tour
        </h1>
        <p className="italic opacity-80">{summary}</p>
        <div className="space-y-2 opacity-85">
          <div className="grid grid-cols-2 gap-8">
            <div className="flex gap-2 items-center">
              <span className="mt-1">
                <CiLocationOn className="text-green-700 text-xl" />
              </span>
              <span className="whitespace-nowrap">
                {startLocation.description}
              </span>
            </div>
            <div className="flex gap-4 items-center">
              <span className="mt-1">
                <CiCalendar className="text-green-700 text-xl" />
              </span>
              <span className="whitespace-nowrap">
                {month[date.getMonth()]} {date.getFullYear()+4}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div className="flex gap-2 items-center">
              <span className="mt-1">
                <CiFlag1 className="text-green-700 text-xl" />
              </span>
              <span>{location.length}-stops</span>
            </div>
            <div className="flex gap-4 items-center">
              <span className="mt-1">
                <CiUser className="text-green-700 text-xl" />
              </span>
              <span>{maxGroupSize} people</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between bg-slate-100 p-6">
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
        <button className="rounded-full px-4 h-12 w-26 text-white bg-primary-green hover:bg-primary-green-hover cursor-pointer focus:outline-none">
          DETAILS
        </button>
      </div>
    </div>
  );
}

export default Tour;
