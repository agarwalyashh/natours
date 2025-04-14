export async function getReviews() {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/v1/reviews`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    if (!res.ok) throw new Error("Failed to fetch reviews.");
    const jsonResponse = await res.json();
    return jsonResponse.data.reviews;
  } catch (err) {
    return null;
  }
}

export async function addReview(formData) {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/reviews`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      if (!res.ok) throw new Error("Failed to add review");
      const jsonResponse = await res.json();
      return jsonResponse.data.review;
    } catch (err) {
      return null;
    }
  }