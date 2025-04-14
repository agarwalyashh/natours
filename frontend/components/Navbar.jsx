import { useNavigate } from "react-router-dom";
import logo from "../public/img/logo-white.png";
import { useAuth } from "../context/authContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logoutUser } from "../services/apiAuth";
import { toast } from "react-toastify";
import { toastStyles } from "../utils/helper";

function Navbar() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      toast.success("Logged out!",toastStyles);
      queryClient.invalidateQueries({ queryKey: ["login"] });
      navigate("/")
    },
    onError:(err)=>{
      toast.error(err.message,toastStyles)
    }
  });

  return (
    <nav className="flex bg-gray-600 text-white justify-between px-4 py-2 md:py-4 md:px-6 m-2 items-center text-xs md:text-sm lg:text-[16px]">
      <p onClick={()=>navigate("/")} className="cursor-pointer">ALL TOURS</p>
      <img
        src={logo}
        alt="logo"
        className="md:h-8 h-5 hidden sm:block cursor-pointer"
        onClick={() => navigate("/")}
      />
      {!user && (
        <div className="flex md:gap-4 gap-2">
          <button
            className="p-1 cursor-pointer focus:outline-none"
            onClick={() => navigate("login")}
          >
            LOG IN
          </button>
          <button
            className="border rounded-full cursor-pointer md:py-1 md:px-3 px-2 focus:outline-none"
            onClick={() => navigate("signup")}
          >
            SIGN UP
          </button>
        </div>
      )}
      {user && (
        <div className="flex md:gap-4 gap-2 items-center">
          <p className="cursor-pointer" onClick={()=>navigate("me")}>
            Welcome,{" "}
            <span className="uppercase font-semibold">
              {user.name.split(" ")[0] || user.name}
            </span>
          </p>
          <button
            className="border rounded-full cursor-pointer md:py-1 md:px-3 px-2 focus:outline-none"
            onClick={() => mutate()}
          >
            LOG OUT
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
