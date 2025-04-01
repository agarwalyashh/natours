import logo from "../public/img/logo-white.png"
function Navbar() {
  return (
    <nav className="flex bg-gray-600 text-white justify-between px-4 py-2 md:py-4 md:px-6 m-2 items-center text-xs md:text-sm lg:text-[16px]">
      <p>ALL TOURS</p>
      <img src={logo} alt="logo" className="md:h-8 h-5 hidden sm:block"/>
      <div className="flex md:gap-4 gap-2">
        <button className="p-1 cursor-pointer focus:outline-none">LOG IN</button>
        <button className="border rounded-full cursor-pointer md:py-1 md:px-3 px-2 focus:outline-none">SIGN UP</button>
      </div>
    </nav>
  )
}

export default Navbar
