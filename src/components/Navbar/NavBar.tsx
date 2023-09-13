import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";
import { RootStore } from "../../stores";

export default function NavBar() {
  const userInfo = useAppSelector((state: RootStore) => state.twitch.user);

  return (
    <nav className=" pb-3 mainBg">
      <div className="container flex items-center justify-between py-4 mx-auto">
        <div>
          <Link to="/" className="flex items-center">
            <img className="w-10 h-auto mt-2 mr-2" src={logo} alt="Logo" />
            <h2 className="text-gray-300 text-3xl font-bold">Lesspale</h2>
          </Link>
        </div>
        <div className="flex items-center cursor-pointer border p-1 rounded border-slate-700">
          <img className="w-8 h-8 rounded-full ml-1" src={userInfo ? userInfo?.picture : "nopic"} alt="Avatar" />
          <span className="text-gray-300 ml-2">{userInfo ? userInfo?.preferred_username : ""}</span>
          <p
            className="p-2 ml-3 mr-1 bg-slate-700 rounded text-gray-300 hover:bg-slate-600 transition-colors"
            onClick={() => {
              localStorage.clear();
              location.reload();
            }}
          >
            Exit
          </p>
        </div>
      </div>
    </nav>
  );
}
