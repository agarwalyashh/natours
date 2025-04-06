import { CiStar, CiUser, CiCalendar } from "react-icons/ci";
import { IoIosTrendingUp } from "react-icons/io";
import { month } from "../../services/apiTours";
function TourAbout({ name,difficulty,maxGroupSize,ratingsAverage,startDates,description,guides }) {
  const date = new Date(startDates[0])
  const monthName = month[date.getMonth()];
  const year = date.getFullYear()+4;

  const leadGuides = guides.filter((guide) => guide.role === "lead-guide");
  const guide = guides.filter((guide) => guide.role === "guide");

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 my-2 mx-auto">
      <div className="flex flex-col gap-10 md:gap-12 xl:gap-16 bg-gray-200 p-10 sm:p-12 md:p-16 xl:p-20">
        <div className="flex flex-col gap-6">
          <h1 className="uppercase text-green-700 font-semibold text-lg sm:text-xl lg:text-2xl">
            Quick Facts
          </h1>
          <div className="flex flex-col gap-4 md:gap-6 text-sm sm:text-lg">
            <div className="flex gap-3 md:gap-4 items-center">
              <p className="flex gap-3 md:gap-4 items-center justify-center">
                <span className="flex gap-2 items-center">
                  <CiCalendar className="text-lg md:text-xl text-green-700" />
                  <span className="uppercase font-semibold">Next Date</span>
                </span>
              </p>
              <span className="capitalize font-light">{monthName} {year}</span>
            </div>
            <div className="flex gap-3 md:gap-4 items-center">
              <p className="flex gap-3 md:gap-4 items-center justify-center">
                <span className="flex gap-2 items-center">
                  <IoIosTrendingUp className="text-lg md:text-xl text-green-700" />
                  <span className="uppercase font-semibold">Difficulty</span>
                </span>
                <span className="capitalize font-light">{difficulty}</span>
              </p>
            </div>
            <div className="flex gap-3 md:gap-4 items-center">
              <p className="flex gap-3 md:gap-4 items-center justify-center">
                <span className="flex gap-2 items-center">
                  <CiStar className="text-lg md:text-xl text-green-700" />
                  <span className="uppercase font-semibold">Participants</span>
                </span>
                <span className="capitalize font-light">{maxGroupSize} People</span>
              </p>
            </div>
            <div className="flex gap-3 md:gap-4 items-center">
              <p className="flex gap-3 md:gap-4 items-center justify-center">
                <span className="flex gap-2 items-center">
                  <CiUser className="text-lg md:text-xl text-green-700" />
                  <span className="uppercase font-semibold">Rating</span>
                </span>
                <span className="font-light">{ratingsAverage} / 5</span>
              </p>
            </div>
          </div>
        </div>
        <div className="space-y-4 md:space-y-6">
          <h1 className="uppercase text-green-700 font-semibold text-lg sm:text-xl lg:text-2xl">
            Your Tour Guides
          </h1>
          {leadGuides.map((guide) => (
            <div key={guide._id} className="flex items-center gap-3 md:gap-4">
                <h1 className="text-sm sm:text-lg font-semibold uppercase">Lead Guide</h1>
                <h1 className="text-sm sm:text-lg font-light capitalize">{guide.name}</h1>
            </div>
          ))}
          {guide.map((guide) => (
            <div key={guide._id} className="flex items-center gap-4">
                <h1 className="text-sm sm:text-lg font-semibold uppercase">Tour Guide</h1>
                <h1 className="text-sm sm:text-lg font-light capitalize">{guide.name}</h1>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-gray-100 p-10 sm:p-12 md:p-16 xl:p-20 space-y-4 md:space-y-6">
        <h1 className="uppercase text-green-700 font-semibold text-lg sm:text-xl lg:text-2xl">
          About {name}
        </h1>
        <p className="font-light text-sm sm:text-lg">{description}</p>
      </div>
    </div>
  );
}

export default TourAbout;
