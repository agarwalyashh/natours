function TourImages({ images }) {
  return (
    <div className="flex clip-path-trapezoid-img">
      {images.map((image, index) => (
        <img key={index} src={`/img/tours/${image}`} alt="image" className="object-cover h-60 sm:h-70 md:h-80 xl:h-100 w-full"/>
      ))}
    </div>
  );
}

export default TourImages;
