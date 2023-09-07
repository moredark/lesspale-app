interface LeaderboardElementProps {
  elementProps: {
    nickname: string;
    level: number;
    experience: number;
    place?: number;
  };
}

function LeaderboardElement({ elementProps }: LeaderboardElementProps) {
  return (
    <div className="mb-3 mx-10 p-3 flex justify-center items-center border-solid border-2 border-slate-500 rounded">
      <div className="min-w-[100px] flex justify-center lg:min-w-[400px]">
        <p className="text-2xl">{elementProps.level}</p>
      </div>
      <div className="min-w-[100px] flex justify-center lg:min-w-[400px]">
        <p className="text-2xl">{elementProps.nickname}</p>
      </div>
      <div className="min-w-[100px] flex justify-center lg:min-w-[400px]">
        <p className="text-2xl">{elementProps.experience}</p>
      </div>
    </div>
  );
}

export default LeaderboardElement;
