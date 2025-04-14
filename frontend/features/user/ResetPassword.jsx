import { useState } from "react";
import { resetPassword } from "../../services/apiAuth";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { toastStyles } from "../../utils/helper";

function ResetPassword() {
    const [password,setPassword] = useState("")
    const [passwordConfirm,setCpassword] = useState("")
    const {id} = useParams()
    const navigate = useNavigate()

    async function handleSubmit(e)
    {
        e.preventDefault();
        const formData = {
            password,passwordConfirm,token:id
        }
        const res = await resetPassword(formData)
        if(res.status === "success")
        {
            toast.success("Password reset successful",toastStyles);
            navigate("/login")
        }
        else{
            toast.error(res.message,toastStyles)
        }
    }
  return (
    <form
      className="bg-white p-5 md:p-8 xl:p-10 shadow-md rounded-lg flex flex-col justify-center w-[90%] sm:w-fit mx-auto gap-4 my-[5%]"
      onSubmit={handleSubmit}
    >
      <div className="space-y-2 md:space-y-4">
        <label htmlFor="password" className="text-sm md:text-lg font-semibold">
          Enter New Password
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
        Reset Password
      </button>
    </form>
  )
}

export default ResetPassword
