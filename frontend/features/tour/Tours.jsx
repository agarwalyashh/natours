import { useQuery } from "@tanstack/react-query";
import Tour from "./Tour";
import Loading from "../../components/Loading";
import {getTours} from "../../services/apiTours";
function Tours() {
  const {data:tours=[],isLoading,isError} = useQuery({
    queryKey:["tours"],
    queryFn:getTours
  })
  if(isLoading)
    return <Loading/>
  if(isError)
    return <h1 className="text-2xl sm:text-3xl lg:text-4xl text-center">Tours could not be fetched.</h1>

  return (
    <main className="px-6 sm:py-30 lg:px-40 py-6 mx-auto grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 xl:gap-10">
      {tours.map((tour) => (
        <Tour key={tour.id} tour={tour} />
      ))}
    </main>
  );
}

export default Tours;
