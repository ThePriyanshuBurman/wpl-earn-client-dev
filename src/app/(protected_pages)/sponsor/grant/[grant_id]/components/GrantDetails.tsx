export default function ({ grantDetails }: { grantDetails: any }) {
  return (
    <div className="flex flex-col gap-4 text-slate-300">
      <div className="flex flex-col gap-2">
        <p className="font-polysansbulky text-lg sm:text-xl text-white">
          Organization Description
        </p>
        <p className="text-sm sm:text-base">
          {grantDetails?.orgDescription ?? "Not available"}
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <p className="font-polysansbulky text-lg sm:text-xl text-white">
          Grant Description
        </p>
        <p className="text-sm sm:text-base">
          {grantDetails?.grantDescription ?? "Not available"}
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <p className="font-polysansbulky text-lg sm:text-xl text-white">
          Skills Needed
        </p>
        <div className="flex flex-wrap gap-2">
          {grantDetails?.skills?.length ? (
            grantDetails.skills.map((skill: string, i: number) => (
              <p
                className="px-3 py-1 rounded-lg bg-secondary_dark text-xs sm:text-sm"
                key={i}
              >
                {skill}
              </p>
            ))
          ) : (
            <p className="text-sm sm:text-base">No skills specified</p>
          )}
        </div>
      </div>
    </div>
  );
}
