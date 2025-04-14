import { IoSettingsOutline } from "react-icons/io5";
import { TfiBag } from "react-icons/tfi";
import { CiStar } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
function Sidebar() {
  const navigate = useNavigate()
  return (
    <ul className="bg-primary-green sm:p-8 lg:p-10 space-y-6">
      <li className="flex items-center gap-2 cursor-pointer text-lg text-white" onClick={()=>navigate("settings")}>
        <span><IoSettingsOutline className="text-lg"/></span>
        <p className="">Settings</p>
      </li>
      <li className="flex items-center gap-2 cursor-pointer text-lg text-white" onClick={()=>navigate("bookings")}>
        <span><TfiBag className="text-sm"/></span>
        <p className="">My Bookings</p>
      </li>
      <li className="flex items-center gap-2 cursor-pointer text-lg text-white" onClick={()=>navigate("reviews")}>
        <span><CiStar className="text-lg"/></span>
        <p className="">My Reviews</p>
      </li>
    </ul>
  )
}

export default Sidebar
