import { useQuery } from "@tanstack/react-query";
import Tour from "./Tour";
import Loading from "./Loading";

async function getTours() {
  const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/tours`);
  if (!res.ok) throw new Error("Failed to fetch tours.");
  const jsonResponse = await res.json();
  return jsonResponse.data.tours;
}
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
    <main className="px-40 py-10 mx-auto grid grid-cols-3 gap-10">
      {tours.map((tour) => (
        <Tour key={tour.id} tour={tour} />
      ))}
    </main>
  );
}

export default Tours;
