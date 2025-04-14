import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppLayout from "../components/AppLayout";
import Error from "../components/Error";
import TourDetails from "../features/tour/TourDetails";
import Tours from "../features/tour/Tours";
import Login from "../features/user/Login";
import { AuthProvider } from "../context/authContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Signup from "../features/user/Signup";
import Account from "../features/user/Account";
import AccountDetails from "../features/user/AccountDetails";
import ProtectedRoute from "../components/ProtectedRoute";
import Reviews from "../features/user/Reviews";
import Bookings from "../features/user/Bookings";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      errorElement: <Error />,
      children: [
        {
          path: "tours",
          element: <Tours />,
        },
        {
          path: "tours/:tourId",
          element: <TourDetails />,
        },
        {
          element: <Navigate to="tours" replace />,
          index: true,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "signup",
          element: <Signup />,
        },
        {
          path: "me",
          element: (
            <ProtectedRoute>
              <Account />
            </ProtectedRoute>
          ),
          children: [
            {
              path: "settings",
              element: <AccountDetails />,
            },
            {
              element: <Navigate to="settings" replace />,
              index: true,
            },
            {
              path:"reviews",
              element:<Reviews/>
            },
            {
              path:"bookings",
              element:<Bookings/>
            }
          ],
        },
      ],
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ToastContainer limit={2} hideProgressBar />
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
