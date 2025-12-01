export const getPosts = async (queryParams) => {
  try {
    console.log("backend URL:", import.meta.env.VITE_BACKEND_URL);
    const url = new URL("posts", import.meta.env.VITE_BACKEND_URL);

    Object.entries(queryParams).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== "") url.searchParams.set(k, v);
    });

    const res = await fetch(url.toString());
    return await res.json();
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
};

export const getPostById = async (postId) => {
  const url = new URL(`posts/${postId}`, import.meta.env.VITE_BACKEND_URL);

  const res = await fetch(url.toString());
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(
      `Failed to load post (${res.status}): ${text || "unknown error"}`,
    );
  }

  return res.json();
};

export const createPost = async (
  token,
  { title, contents, tags, startingPrice, startTime, endTime },
) => {
  const url = new URL("posts", import.meta.env.VITE_BACKEND_URL);

  const body = {
    title,
    contents,
    tags,
    ...(startingPrice !== undefined &&
      startingPrice !== "" && {
        startingPrice: Number(startingPrice),
      }),
    ...(startTime && { startTime }),
    ...(endTime && { endTime }),
  };

  const res = await fetch(url.toString(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}));
    throw new Error(errorBody.error || "Failed to create post");
  }

  return res.json();
};

export const placeBid = async (token, postId, amount) => {
  const url = new URL(`posts/${postId}/bid`, import.meta.env.VITE_BACKEND_URL);

  const res = await fetch(url.toString(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ amount }),
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}));
    throw new Error(errorBody.error || "Failed to place bid");
  }

  return res.json();
};
