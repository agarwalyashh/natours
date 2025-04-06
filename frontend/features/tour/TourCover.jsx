import { GoClock } from "react-icons/go";
import { CiLocationOn } from "react-icons/ci";

function TourImage({name,imageCover,duration,startLocation}) {
  const firstName = name.split(" ")[0] + " " + name.split(" ")[1];
  const lastName = name.split(" ")[2] + " Tour";
  return (
    <div className="relative clip-path-trapezoid">
      <img src={imageCover} alt="image" className="w-full object-cover h-80 sm:h-100 md:h-120 xl:h-150" />
      <div className="absolute inset-0 bg-gradient-to-b from-green-400 to-green-500 opacity-50"></div>
      <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
        <h1 className="text-white text-2xl sm:text-3xl lg:text-4xl px-1 sm:px-2 uppercase font-bold tracking-wide  opacity-80 w-fit">
          {firstName}
        </h1>
        <h1
          className="text-white text-2xl sm:text-3xl lg:text-4xl px-1 sm:px-2 uppercase font-bold tracking-wide opacity-80 w-fit"
          ss
        >
          {lastName}
        </h1>
        <div className="flex items-center gap-10 mt-3 sm:mt-5 md:text-lg">
          <p className="flex gap-2 items-center font-semibold">
            <span>
              <GoClock />
            </span>
            {duration} DAYS
          </p>
          <p className="flex gap-2 items-center font-semibold">
            <span>
              <CiLocationOn />
            </span>
            {startLocation.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default TourImage;
