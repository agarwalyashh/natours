import logo from "../../public/img/logo-green-round.png"
function TourFooter() {
  return (
    <div className="rounded-lg bg-white shadow-lg w-fit shadow-gray-200 my-6 lg:my-10 flex gap-4 sm:gap-6 lg:gap-8 items-center p-4 lg:p-6 mx-auto">
      <img src={logo} alt="logo" className="h-16 sm:h-18 md:h-20 xl:h-25"/>
      <div className="spcace-y-2">
        <h1 className="uppercase text-green-600 font-semibold text-sm sm:text-lg md:text-xl xl:text-2xl">What are you waiting for?</h1>
        <p className="text-xs sm:text-sm lg:text-lg">Infinite memories, make it yours today!</p> 
      </div>
      <button className="uppercase rounded-full px-2 md:px-3 xl:px-4 py-1 sm:py-2 text-[10px] sm:text-xs lg:text-lg bg-primary-green text-white cursor-pointer hover:bg-primary-green-hover">Login to book tour</button>
    </div>
  )
}

export default TourFooter
