import { useState } from "react";
import { createPortal } from "react-dom";
import { forgotPassword } from "../../services/apiAuth";
import { toast } from "react-toastify";
import { toastStyles } from "../../utils/helper";

function ForgotPassword({ setModal }) {
  const [email, setEmail] = useState("");
  async function handleSubmit(e)
  {
    e.preventDefault()
    const res = await forgotPassword({email})
    if(res.status==="success")
    {
        toast.success("Reset Link sent to email inbox",toastStyles);
        setModal(false);
    }
    else{
        toast.error(res.message,toastStyles);
        setModal(false)
    }
  }
  return createPortal(
    <div className="fixed inset-0 backdrop-blur-sm bg-opacity-40 flex items-center justify-center z-1">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] sm:w-[400px] relative">
        <p
          className="absolute top-2 right-4 text-2xl rotate-45 cursor-pointer text-gray-600"
          onClick={() => setModal(false)}
        >
          +
        </p>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <label htmlFor="email" className="text-sm md:text-lg font-semibold">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            required
            className="border-2 border-gray-300 p-2 rounded-lg w-full focus:outline-none"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type="submit"
            className="bg-green-500 text-white rounded px-4 py-2 hover:bg-green-600 cursor-pointer"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>,
    document.getElementById("root")
  );
}

export default ForgotPassword;
