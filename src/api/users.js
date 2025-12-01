export const signup = async ({ username, password }) => {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}user/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) throw new Error("Failed to signup");
  return await res.json();
};

export const login = async ({ username, password }) => {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}user/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) throw new Error("Failed to login");
  return await res.json();
};

export const getUserInfo = async (id) => {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}users/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  return await res.json();
};

export const updateUser = async ({
  token,
  currentPassword,
  newUsername,
  newPassword,
}) => {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}user`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ currentPassword, newUsername, newPassword }),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || "Failed to update user");
  }

  return await res.json();
};

export const deleteUser = async (token) => {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}user`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (res.status === 204) return { ok: true };

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || "Failed to delete user");
  }

  return await res.json().catch(() => ({ ok: true }));
};
