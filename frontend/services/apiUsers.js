export async function getUser() {
  const res = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/api/v1/users/getMe`,
    {
      method: "GET",
      credentials: "include",
    }
  );
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to get user");
  }
  const jsonResponse = await res.json();
  return jsonResponse.data.user;
}

export async function updateUser(formData) {
  const res = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/api/v1/users/updateMe`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
      credentials: "include",
    }
  );
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to update settings");
  }
  const jsonResponse = await res.json();
  return jsonResponse.data.user;
}
export async function updatePassword(formData) {
  const res = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/api/v1/users/updateMyPassword`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
      credentials: "include",
    }
  );
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to update password");
  }
  const jsonResponse = await res.json();
  return jsonResponse;
}

export async function deleteMe() {
  const res = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/api/v1/users/deleteMe`,
    {
      method: "DELETE",
      credentials: "include",
    }
  );
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to delete user");
  }
  return res.status === 204 ? { status: "success" } : await res.json();
}