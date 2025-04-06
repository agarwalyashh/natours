import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getTour } from "../../services/apiTours";

import Loading from "../../components/Loading";
import Error from "../../components/Error";
import TourCover from "./TourCover";
import TourAbout from "./TourAbout";
import TourImages from "./TourImages";
import TourReviews from "./TourReviews";
import TourMap from "./TourMap";
import TourFooter from "./TourFooter";

function TourDetails() {
  const { tourId } = useParams();
  const {
    data: tour = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["tour", tourId],
    queryFn: () => getTour(tourId),
  });
  if (isLoading) return <Loading />;
  if (isError) return <Error />;
  let {
    description,
    difficulty,
    duration,
    imageCover,
    images,
    guides,
    maxGroupSize,
    name,
    ratingsAverage,
    reviews,
    startDates,
    startLocation,
    location
  } = tour;

  imageCover = "../public/img/tours/" + imageCover;

  return (
    <div className="mx-2">
      <TourCover imageCover={imageCover} duration={duration} name={name} startLocation={startLocation}/>
      <TourAbout name={name} difficulty={difficulty} maxGroupSize={maxGroupSize} ratingsAverage={ratingsAverage} startDates={startDates} description={description} guides={guides}/>
      <TourImages images={images} />
      <TourMap location={location} startLocation={startLocation}/>
      <TourReviews reviews={reviews}/>
      <TourFooter/>
    </div>
  );
}

export default TourDetails;
