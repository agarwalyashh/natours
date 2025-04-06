import logo from "../public/img/logo-green.png"
function Footer() {
  return (
    <footer className="flex justify-center sm:justify-between items-center px-4 py-2 md:py-4 md:px-6 m-2 text-xs sm:text-sm lg:text-[16px] w-full">
      <img src={logo} alt="logo" className="h-4 sm:h-6 md:h-8 hidden sm:block"/>
      <div className="flex flex-col gap-1 sm:gap-2 text-black/60">
        <ul className="flex items-center gap-2 sm:gap-3">
            <li className="cursor-pointer">About Us</li>
            <li className="cursor-pointer">Become a guide</li>
            <li className="cursor-pointer">Contact</li>
        </ul>
        <p className="sm:text-end">© All Rights Reserved</p>
      </div>
    </footer>
  )
}

export default Footer
