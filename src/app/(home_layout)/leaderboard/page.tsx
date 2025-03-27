import LeaderBoardTable from "./components/LeaderBoardTable";

export default function Page() {
  return (
    <div className="flex flex-col w-full h-full text-primary_text_dark relative">
      <div className="flex flex-col gap-12 w-full items-center  min-h-screen p-[8%] pt-[12%] z-20">
        <p className="text-[55px] font-[700] font-polysansbulky leading-[58px] tracking-tight">
          <span className="gradient-text">WPL</span> Leaderboard
        </p>

        <div className="w-[70%]">
          <LeaderBoardTable />
        </div>
      </div>
    </div>
  );
}
