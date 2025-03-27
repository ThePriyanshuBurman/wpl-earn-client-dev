export default function Page() {
  return (
    <div className="w-full h-max bg-[#0c1517] border border-[#172527] rounded-lg">
      <img src="/images/png/grant.png" className="rounded-t-lg" alt="" />
      <div className="flex flex-col gap-6 p-4">
        <div className="flex flex-col gap-2 ">
          <p className="text-lg">UpRock DePIN Catalyst</p>
          <p className="flex items-center gap-2 text-sm">
            <img src="/images/png/strk-icon.png" alt="" className="h-5 w-5 " />{" "}
            5K - 6K STRK
          </p>
        </div>
        <button className="border border-[#46cfb6] py-2 rounded-lg">
          Apply Now
        </button>
      </div>
    </div>
  );
}
