export default function Page() {
  return (
    <div className="w-full max-w-sm mx-auto h-max bg-[#0c1517] border border-[#172527] rounded-lg">
      {/* Image */}
      <img src="/images/png/grant.png" className="w-full h-auto rounded-t-lg" alt="" />

      {/* Content */}
      <div className="flex flex-col gap-4 sm:gap-6 p-3 sm:p-4">
        <div className="flex flex-col gap-2">
          <p className="text-base sm:text-lg">UpRock DePIN Catalyst</p>
          <p className="flex items-center gap-2 text-sm">
            <img src="/images/png/strk-icon.png" alt="" className="h-4 w-4 sm:h-5 sm:w-5" /> 
            5K - 6K STRK
          </p>
        </div>

        {/* Button */}
        <button className="border border-[#46cfb6] py-2 sm:py-3 rounded-lg w-full transition-all hover:bg-[#46cfb6] hover:text-black">
          Apply Now
        </button>
      </div>
    </div>
  );
}
