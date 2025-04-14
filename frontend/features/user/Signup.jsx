import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { toastStyles } from "../../utils/helper";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { signupUser, welcomeEmail } from "../../services/apiAuth";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setCpassword] = useState("");
  const [name,setName] = useState("")
  const navigate = useNavigate()
  
  function sendWelcomeEmail(){
    welcomeEmail({email,name})
  }
  async function handleSubmit(e){
    e.preventDefault();
    mutate({email,password,name,passwordConfirm})
  }
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (data)=>signupUser(data),
    onSuccess: () => {
      console.log("Signup successful");
      toast.success("Signup successfull!",toastStyles);
      queryClient.invalidateQueries({ queryKey: ["login"] });
      sendWelcomeEmail()
      navigate("/")
    },
    onError:(err)=>{
      console.log(err)
      toast.error(err.message,toastStyles)
    }
  });
  return (
    <form
      className="bg-white p-5 md:p-8 xl:p-10 shadow-md rounded-lg flex flex-col justify-center w-[90%] sm:w-fit mx-auto gap-4 my-[5%]"
      onSubmit={handleSubmit}
    >
      <h1 className="text-lg sm:text-xl lg:text-2xl uppercase text-green-600 font-semibold">
          Create an Account
      </h1>
      <div className="space-y-2 md:space-y-4">
        <label htmlFor="name" className="text-sm md:text-lg font-semibold">
          Tell us your Name
        </label>
        <input
          required
          type="text"
          id="name"
          className="border-2 border-gray-300 p-1 sm:p-2 rounded-lg w-full focus:outline-none"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
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
      <div className="space-y-2 md:space-y-4">
        <label htmlFor="cpassword" className="text-sm md:text-lg font-semibold">
          Confirm Password
        </label>
        <input
          required
          type="password"
          id="cpassword"
          className="border-2 border-gray-300 p-1 sm:p-2 rounded-lg w-full focus:outline-none"
          placeholder="Confirm your password"
          value={passwordConfirm}
          onChange={(e) => setCpassword(e.target.value)}
        />
      </div>

      <button
        type="submit"
        className="uppercase bg-secondary-green hover:bg-primary-green cursor-pointer rounded-sm w-fit text-white p-2 md:px-4 md:py-2"
      >
        Sign Up
      </button>
    </form>
  );
}

export default Signup;
