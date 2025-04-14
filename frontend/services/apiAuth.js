export async function loginUser(formData) {
  const res = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/api/v1/users/login`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
      credentials: "include",
    }
  );
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Login failed.");
  }
  return await res.json();
}

export async function logoutUser() {
  const res = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/api/v1/users/logout`,
    {
      method: "GET",
      credentials: "include",
    }
  );
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Logout failed.");
  }
  return await res.json();
}

export async function isLoggedIn() {
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/v1/users/isLoggedIn`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Error checking login status");
    }

    const data = await res.json();
    return { user: data.user };
}

export async function signupUser(formData) {
  const res = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/api/v1/users/signup`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
      credentials: "include",
    }
  );
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Signup failed.");
  }
  return await res.json();
}

export async function welcomeEmail(data) {
  const res = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/api/v1/emails`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include",
    }
  );
  return await res.json();
}

export async function forgotPassword(formData) {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/v1/users/forgotPassword`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      }
    );
    if (!res.ok) {
      const errorData = await res.json();
      return {
        status: "error",
        message: errorData.message || "Failed to reset password",
      };
    }
    return await res.json();
  } catch (err) {
    return { status: "error", message: err.message || "Something went wrong" };
  }
}

export async function resetPassword(formData) {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/v1/users/resetPassword/${formData.token}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      }
    );
    if (!res.ok) {
      const errorData = await res.json();
      return {
        status: "error",
        message: errorData.message || "Failed to reset password",
      };
    }
    return await res.json();
  } catch (err) {
    return { status: "error", message: err.message || "Something went wrong" };
  }
}
