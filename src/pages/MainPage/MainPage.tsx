import { Link } from "react-router-dom";
import picBg from "../../assets/mainBg.png";

export function MainPage() {
  return (
    <div className="container mx-auto bg-slate-600 rounded flex flex-row justify-around">
      <div className="p-5 flex flex-col items-center justify-center">
        <h2 className="text-4xl text-gray-200 mb-8">Menu</h2>
        <div className="flex flex-col gap-2 text-center">
          <Link to="/spokenChat">
            <p className="text-gray-200 text-[24px] bg-slate-700 p-3 rounded-md hover:text-gray-100 hover:bg-slate-800 transition-colors">
              Spoken chat
            </p>
          </Link>
          <Link to="/leaderboard">
            <p className="text-gray-200 text-[24px] bg-slate-700 p-3 rounded-md hover:text-gray-100 hover:bg-slate-800 transition-colors">
              Leaderboard
            </p>
          </Link>
          <Link to="/businessCards">
            <p className="text-gray-200 text-[24px] bg-slate-700 p-3 rounded-md hover:text-gray-100 hover:bg-slate-800 transition-colors">
              Business cards
            </p>
          </Link>
          <Link to="/widgets">
            <p className="text-gray-200 text-[24px] bg-slate-700 p-3 rounded-md hover:text-gray-100 hover:bg-slate-800 transition-colors">Widgets</p>
          </Link>
        </div>
      </div>
      <div className="flex justify-center">
        <img className="h-auto" src={picBg} alt="" />
      </div>
    </div>
  );
}
