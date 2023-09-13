import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";
import { RootStore } from "../../stores";

function PrivateRoute() {
  //FIXME: Warning: Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, 
  //but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render.
  const userInfo = useAppSelector((state: RootStore) => state.twitch.user);
  return userInfo.preferred_username ? <Outlet /> : <Navigate to="auth" />;
}

export default PrivateRoute;
