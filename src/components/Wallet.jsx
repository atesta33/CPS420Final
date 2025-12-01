import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../contexts/AuthContext.jsx";
import { getUserInfo } from "../api/users.js";

export function Wallet() {
  const { token, userId } = useAuth() || {};

  if (!token || !userId) return null;

  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUserInfo(userId),
  });

  if (isLoading) return <span>Wallet: …</span>;
  if (isError || !user) return <span>Wallet: error</span>;

  return (
    <span>
      Wallet: <strong>{user.tokens}</strong> tokens
    </span>
  );
}
