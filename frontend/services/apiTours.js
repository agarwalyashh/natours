export async function getTours() {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/v1/tours`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    if (!res.ok) throw new Error("Failed to fetch tours.");
    const jsonResponse = await res.json();
    return jsonResponse.data.tours;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export async function getTour(id) {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/v1/tours/${id}`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    if (!res.ok) throw new Error("Failed to fetch tours.");
    const jsonResponse = await res.json();
    return jsonResponse.data.tour;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export const month = {
  0: "January",
  1: "February",
  2: "March",
  3: "April",
  4: "May",
  5: "June",
  6: "July",
  7: "August",
  8: "September",
  9: "October",
  10: "November",
  11: "December",
};
