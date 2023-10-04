import { useAppSelector } from "../../hooks/redux";
import { RootStore } from "../../stores";
import { useGetUserLeaderboardQuery } from "../../stores/back/back.api";
import { ReactElement, useEffect, useState } from "react";
import LeaderboardElement from "./LeaderboardElement";
import Pagination from "../../components/Pagination/Pagination";

function Leaderboard() {
  const [leaderboardElements, setLeaderboardElements] = useState<ReactElement[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 10;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const userName = useAppSelector((state: RootStore) => state.twitch.user.preferred_username);

  const { data, isLoading } = useGetUserLeaderboardQuery({ channel: userName, page: currentPage });

  useEffect(() => {
    if (data) {
      setTotalItems(data.count);
      const leaderboardElements = data.results.map((leaderboardElement) => {
        return <LeaderboardElement key={leaderboardElement.nickname} elementProps={leaderboardElement} />;
      });
      setLeaderboardElements(leaderboardElements);
    }
  }, [data]);

  return (
    <div className="mainBg min-h-screen pb-6">
      <div className="flex flex-col justify-center items-center mx-auto bg-slate-600 text-gray-200 container py-5 rounded">
        <h2 className="font-bold uppercase text-3xl">Leaderboard</h2>
        {totalItems > itemsPerPage && (
          <div className="mt-5 mx-10 border-slate-500 border-2 px-10 py-2 border-x-0 border-t-0">
            <Pagination currentPage={currentPage} itemsPerPage={itemsPerPage} totalItems={totalItems} onPageChange={handlePageChange} />
          </div>
        )}
        <div className="w-full mt-2 mx-10 p-3 flex justify-center items-center ">
          <p className="text-slate-300 font-bold text-xl min-w-[100px] flex justify-center lg:min-w-[400px]">Level</p>
          <p className="text-slate-300 font-bold text-xl min-w-[100px] flex justify-center lg:min-w-[400px]">Points</p>
        </div>
        {isLoading ? <p className="text-2xl">loading...</p> : <div className="w-full">{leaderboardElements}</div>}
      </div>
    </div>
  );
}

export default Leaderboard;
