import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { userAuth } from "../../stores/twitch/twitch.slice";

function PrivateRoute() {
  const userAuth: userAuth = useSelector((state: any) => state.twitch.userAuth);

  return userAuth.access_token ? <Outlet /> : <Navigate to="auth" />;
}

export default PrivateRoute;
