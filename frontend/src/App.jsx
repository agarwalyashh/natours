import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import AppLayout from "../components/AppLayout";
import Error from "../components/Error";
import TourDetails from "../features/tour/TourDetails";
import Tours from "../features/tour/Tours";

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
          path:"tours/:tourId",
          element:<TourDetails/>
        },
        {
          element: <Navigate to="tours" replace />,
          index: true,
        },
      ],
    },
  ]);
  return <RouterProvider router={router}></RouterProvider>;
}
export default App;
