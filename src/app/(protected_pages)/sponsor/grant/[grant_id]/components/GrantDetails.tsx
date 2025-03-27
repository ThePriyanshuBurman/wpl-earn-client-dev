export default function ({ grantDetails }: { grantDetails: any }) {
  return (
    <div className="flex flex-col gap-4 text-slate-300">
      <div className="flex flex-col gap-2">
        <p className="font-polysansbulky text-lg text-white">
          Organization Description
        </p>
        <p>{grantDetails?.orgDescription}</p>
      </div>
      <div className="flex flex-col gap-2">
        <p className="font-polysansbulky text-lg text-white">
          Grant Description
        </p>
        <p>{grantDetails?.grantDescription}</p>
      </div>

      <div className="flex flex-col gap-2">
        <p className="font-polysansbulky text-lg text-white">Skills Needed</p>
        <div className="flex flex-wrap gap-2">
          {grantDetails?.skills?.map((skill: string, i: number) => {
            return (
              <p
                className="px-3 py-1 rounded-lg bg-secondary_dark text-xs"
                key={i}
              >
                {skill}
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
}
