export default function ({ bountyDetails }: { bountyDetails: any }) {
  return (
    <div className="flex flex-col gap-3 sm:gap-4 text-slate-300">
      {/* Details Section */}
      <div className="flex flex-col gap-2">
        <p className="font-polysansbulky text-base md:text-lg text-white">Details</p>
        <div
          className="break-words text-sm md:text-base"
          dangerouslySetInnerHTML={{
            __html: bountyDetails?.description
              ?.replace(/\\n/g, "<br>")
              .replace(/"/g, ""),
          }}
        />
      </div>

      {/* Skills Needed Section */}
      <div className="flex flex-col gap-2">
        <p className="font-polysansbulky text-base md:text-lg text-white">Skills Needed</p>
        <div className="flex flex-wrap gap-2 sm:gap-3">
          {bountyDetails?.skills?.map((skill: string, i: number) => (
            <p
              className="px-2 py-1 md:px-3 md:py-1 rounded-lg bg-secondary_dark text-xs md:text-sm"
              key={i}
            >
              {skill}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
