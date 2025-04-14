import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMe, updatePassword, updateUser } from "../../services/apiUsers";
import { useState } from "react";
import { toast } from "react-toastify";
import { toastStyles } from "../../utils/helper";
import { useNavigate } from "react-router-dom";

function AccountDetails() {
  const queryClient = useQueryClient();
  const navigate = useNavigate()

  const [name, setName] = useState("");
  const [passwordCurrent, setOldPassword] = useState("");
  const [password, setNewPassword] = useState("");
  const [passwordConfirm, setConfirmPassword] = useState("");
  const { mutate } = useMutation({
    mutationFn: (data) => updateUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["login"] });
      toast.success("Updated successfully", toastStyles);
    },
    onError: (err) => {
      toast.error(err.message, toastStyles);
    },
  });
  const { mutate:mutatePassword } = useMutation({
    mutationFn: (data) => updatePassword(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["login"] });
      toast.success("Updated successfully", toastStyles);
    },
    onError: (err) => {
      toast.error(err.message, toastStyles);
    },
  });
  const { mutate:deleteUser } = useMutation({
    mutationFn: deleteMe,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["login"] });
      toast.success("Deleted successfully", toastStyles);
      navigate("/")
    },
    onError: (err) => {
      toast.error(err.message, toastStyles);
    },
  });
  function handleSubmit(e) {
    e.preventDefault();
    mutate({ name });
  }
  function handleSubmitPassword(e) {
    e.preventDefault();
    mutatePassword({ passwordCurrent, password,passwordConfirm});
  }

  function handleDelete(){
    deleteUser()
  }

  return (
    <div className="flex flex-col">
      <div className="my-2 sm:my-4 mx-5 sm:mx-[10rem] space-y-4 md:space-y-6">
        <h1 className="uppercase text-green-600 font-semibold text-lg sm:text-xl lg:text-2xl">
          YOUR ACCOUNT SETTINGS
        </h1>
        <form className="space-y-2 md:space-y-4 border-b-1" onSubmit={handleSubmit}>
          <div className="space-y-1 md:space-y-2 flex flex-col">
            <label htmlFor="name" className="text-sm md:text-lg font-semibold">
              Update your Name
            </label>
            <input
              type="text"
              id="name"
              required
              className="border-2 border-gray-300 p-1 sm:p-2 rounded-lg w-60 md:w-80 focus:outline-none"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="md:flex items-center justify-between gap-2 sm:gap-0">
          <button
            type="submit"
            className="p-1 sm:p-2 rounded-full text-white bg-secondary-green focus:outline-none hover:bg-primary-green-hover cursor-pointer mb-5"
          >
            SAVE SETTINGS
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="p-1 sm:p-2 rounded-full text-white bg-red-500 focus:outline-none hover:bg-red-600 cursor-pointer mb-5"
          >
            DELETE ACCOUNT
          </button>
          </div>
        </form>
      </div>
      <div className="my-2 sm:my-4 mx-5 sm:mx-[10rem] space-y-4 md:space-y-6">
        <h1 className="uppercase text-green-600 font-semibold text-lg sm:text-xl lg:text-2xl">
            Password change
        </h1>
        <form className="space-y-4" onSubmit={handleSubmitPassword}>
          <div className="space-y-1 md:space-y-2 flex flex-col">
            <label htmlFor="op" className="text-sm md:text-lg font-semibold">
              Enter your old password
            </label>
            <input
              type="password"
              id="op"
              required
              className="border-2 border-gray-300 p-1 sm:p-2 rounded-lg w-60 md:-80 focus:outline-none"
              placeholder="Current Password"
              value={passwordCurrent}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
          <div className="space-y-1 md:space-y-2 flex flex-col">
            <label htmlFor="np" className="text-sm md:text-lg font-semibold">
              Enter new password
            </label>
            <input
              type="password"
              id="np"
              required
              className="border-2 border-gray-300 p-1 sm:p-2 rounded-lg w-60 md:-80 focus:outline-none"
              placeholder="New Password"
              value={password}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="space-y-1 md:space-y-2 flex flex-col">
            <label htmlFor="cp" className="text-sm md:text-lg font-semibold">
              Confirm new password
            </label>
            <input
              type="password"
              id="cp"
              required
              className="border-2 border-gray-300 p-1 sm:p-2 rounded-lg w-60 md:-80 focus:outline-none"
              placeholder="Confirm password"
              value={passwordConfirm}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="p-1 sm:p-2 rounded-full text-white bg-secondary-green focus:outline-none hover:bg-primary-green-hover cursor-pointer mb-5"
          >
            SAVE CHANGES
          </button>
        </form>
      </div>
    </div>
  );
}

export default AccountDetails;
