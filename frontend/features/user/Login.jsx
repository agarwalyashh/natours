import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loginUser } from "../../services/apiAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { toastStyles } from "../../utils/helper";
import ForgotPassword from "./ForgotPassword";

function Login() {
  const location = useLocation();
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("");
  const navigate = useNavigate()

  async function handleSubmit(e){
    e.preventDefault();
    mutate({email,password})
  }
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (data)=>loginUser(data),
    onSuccess: () => {
      console.log("Login successful");
      toast.success("Login successfull!",toastStyles);
      queryClient.invalidateQueries({ queryKey: ["login"] });
      navigate("/")
    },
    onError:(err)=>{
      toast.error(err.message,toastStyles)
    }
  });

  const [modal,setModal] = useState(false);
  return (
    <>
    <form className="bg-white p-5 md:p-8 xl:p-10 shadow-md rounded-lg flex flex-col justify-center w-[90%] sm:w-fit mx-auto gap-4 my-[5%]" onSubmit={handleSubmit}>
      <h1 className="text-lg sm:text-xl lg:text-2xl uppercase text-green-600 font-semibold">
        {location.pathname === "/login"
          ? "Log in to your account"
          : "Create a new account"}{" "}
      </h1>
      <div className="space-y-2 md:space-y-4">
        <label htmlFor="email" className="text-sm md:text-lg font-semibold">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          required
          className="border-2 border-gray-300 p-1 sm:p-2 rounded-lg w-full focus:outline-none"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="space-y-2 md:space-y-4">
        <label htmlFor="password" className="text-sm md:text-lg font-semibold">
          Password
        </label>
        <input
          required
          type="password"
          id="password"
          className="border-2 border-gray-300 p-1 sm:p-2 rounded-lg w-full focus:outline-none"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} 
        />
      </div>
      <p className="text-right text-blue-600 underline hover:text-blue-800 cursor-pointer" onClick={()=>setModal(true)}>Forgot Password?</p>
      <button type="submit" className="uppercase bg-secondary-green hover:bg-primary-green cursor-pointer rounded-sm w-fit text-white p-2 md:px-4 md:py-2">
        {location.pathname === "/login" ? "Log in" : "Sign up"}
      </button>
    </form>
    {modal && <ForgotPassword setModal={setModal}/>}
    </>
  );
}

export default Login;
