export async function getTours() {
  const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/tours`);
  if (!res.ok) throw new Error("Failed to fetch tours.");
  const jsonResponse = await res.json();
  return jsonResponse.data.tours;
}

export async function getTour(id) {
  const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/tours/${id}`);
  if (!res.ok) throw new Error("Failed to fetch tours.");
  const jsonResponse = await res.json();
  return jsonResponse.data.tour;
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