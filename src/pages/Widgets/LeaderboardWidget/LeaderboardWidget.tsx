import { useEffect, useState } from "react";
import { LeaderboardMember } from "../../../models/models";
import { useParams } from "react-router-dom";

function LeaderboardWidget() {
  const { secret } = useParams();
  const [leaderboardElements, setLeaderboardElements] = useState([]);

  const leaderboardWs = new WebSocket(`${import.meta.env.VITE_WEBSOCKET_URL}leaderboard/?secret=${secret}`);

  useEffect(() => {
    leaderboardWs.addEventListener("open", function () {
      console.log("Websocket connected");
      leaderboardWs.send(
        JSON.stringify({
          action: "join_room",
          request_id: new Date().getTime(),
        })
      );
    });

    leaderboardWs.addEventListener("message", function (event) {
      const response = JSON.parse(event.data);
      if (response.leaderboard) {
        const leaderboardElements = response.leaderboard.leaderboard_members.map((leaderboardElement: LeaderboardMember) => {
          return (
            <div key={leaderboardElement.nickname} className="text-2xl">
              <span className="text-green-500">{leaderboardElement.nickname}</span>
              <span> {leaderboardElement.level} lvl</span>
              <span> {leaderboardElement.experience} exp</span>
            </div>
          );
        });
        setLeaderboardElements(leaderboardElements);
      }
    });

    leaderboardWs.addEventListener("close", function () {
      console.log("Connection closed");
    });
    // }
    return () => {
      leaderboardWs.close();
    };
  }, []);

  return (
    <div className="px-2 flex flex-col h-screen text-white bg-black bg-opacity-60">
      <h2>Leaderboard</h2>
      {leaderboardElements}
    </div>
  );
}

export default LeaderboardWidget;
