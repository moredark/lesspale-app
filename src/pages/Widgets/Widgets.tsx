import { Link } from "react-router-dom";

function Widgets() {
  return (
    <div className="w-[100%] h-screen mainBg">
      <div className="flex flex-col justify-center items-center mx-auto bg-slate-600 text-gray-200 container py-5 rounded">
        <Link to="/widget">
          <p className="text-gray-200 text-[24px] bg-slate-700 p-3 rounded-md hover:text-gray-100 hover:bg-slate-800 transition-colors">
            Leaderboard
          </p>
        </Link>
      </div>
    </div>
  );
}

export default Widgets;
