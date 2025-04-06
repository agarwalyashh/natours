export async function getUser(id) {
  const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/users/${id}`);
  if (!res.ok) throw new Error("Failed to fetch user.");
  const jsonResponse = await res.json();
  return jsonResponse.data.user;
}