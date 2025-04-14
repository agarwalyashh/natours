export async function createBooking(data){
    try {
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/v1/bookings/${data.tourId}`,
          {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          }
        );
        if (!res.ok) throw new Error("Failed to book tour");
        const jsonResponse = await res.json();
        return {status:"success",data:jsonResponse.data.booking};
      } catch (err) {
        console.log(err);
        return {status:"error",message:err.message}
      }
}

export async function getBookings() {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/v1/bookings`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    if (!res.ok) throw new Error("Failed to fetch bookings.");
    const jsonResponse = await res.json();
    return jsonResponse.data.bookings;
  } catch (err) {
    console.log(err);
    return null;
  }
}