export async function getConversations(userId) {
  const url = new URL("/api/conversations", import.meta.env.VITE_BACKEND_URL)
  url.searchParams.set("userId", userId)

  const res = await fetch(url.toString())
  return res.json()
}
