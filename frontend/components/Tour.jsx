import { CiLocationOn, CiFlag1, CiUser, CiCalendar } from "react-icons/ci";
function Tour() {
  return (
    <div className="rounded-sm flex flex-col space-y-2 w-85 relative">
      <div className="relative h-60 bg-cover bg-center bg-[url('/img/tours/tour-2-cover.jpg')] clip-path-trapezoid">
        <div className="absolute inset-0 bg-gradient-to-b from-green-400 to-green-500 opacity-50"></div>
      </div>
      <h1 className="text-white absolute text-4xl px-2 right-5 top-42 uppercase bg-gradient-to-r from-green-500 to-green-700 opacity-80 ">THE SEA</h1>
      <h1 className="text-white absolute text-4xl px-2 right-2 top-52 uppercase bg-gradient-to-r from-green-500 to-green-700 opacity-80">EXPLORER</h1>
      <div className="p-6 text-start space-y-4">
        <h1 className="uppercase font-semibold opacity-80">
          Medium 7 Day Tour
        </h1>
        <p className="italic opacity-80">
          Exploring the jaw-dropping US east coast by foot and by boat
        </p>
        <div className="space-y-2 opacity-85">
          <div className="grid grid-cols-2">
            <div className="flex gap-4 items-center">
              <span className="mt-1">
                <CiLocationOn className="text-green-700 text-xl" />
              </span>
              <span>Miami, USA</span>
            </div>
            <div className="flex gap-4 items-center">
              <span className="mt-1">
                <CiCalendar className="text-green-700 text-xl" />
              </span>
              <span>June 2021</span>
            </div>
          </div>
          <div className="grid grid-cols-2">
            <div className="flex gap-4 items-center">
              <span className="mt-1">
                <CiFlag1 className="text-green-700 text-xl" />
              </span>
              <span>4-stops</span>
            </div>
            <div className="flex gap-4 items-center">
              <span className="mt-1">
                <CiUser className="text-green-700 text-xl" />
              </span>
              <span>15 people</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between bg-slate-100 p-6">
        <div className="flex flex-col text-start gap-2">
          <p>
            <span className="font-bold opacity-70">$497</span>{" "}
            <span className="opacity-50">per person</span>
          </p>
          <p>
            <span className="font-bold opacity-70">4.8</span>{" "}
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
