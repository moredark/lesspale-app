import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";
import { RootStore } from "../../stores";

function PrivateRoute() {
  const userInfo = useAppSelector((state: RootStore) => state.twitch.user);
  return userInfo.preferred_username ? <Outlet /> : <Navigate to="auth" />;
}

export default PrivateRoute;
