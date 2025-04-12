import { IoSettingsOutline } from "react-icons/io5";
import { TfiBag } from "react-icons/tfi";
import { CiStar } from "react-icons/ci";
function Sidebar() {
  return (
    <ul className="bg-primary-green sm:p-8 lg:p-10 space-y-6">
      <li className="flex items-center gap-2 cursor-pointer text-lg text-white">
        <span><IoSettingsOutline className="text-lg"/></span>
        <p className="">Settings</p>
      </li>
      <li className="flex items-center gap-2 cursor-pointer text-lg text-white">
        <span><TfiBag className="text-sm"/></span>
        <p className="">Bookings</p>
      </li>
      <li className="flex items-center gap-2 cursor-pointer text-lg text-white">
        <span><CiStar className="text-lg"/></span>
        <p className="">Reviews</p>
      </li>
    </ul>
  )
}

export default Sidebar
