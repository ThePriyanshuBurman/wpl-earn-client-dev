"use client";

import Input from "@/components/wpl/components/input";

export default function ({ winners }: { winners: any[] }) {
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex items-center w-full justify-between pl-2">
        <p className="font-polysansbulky text-lg text-white">Winner's 🏆</p>

        <div className="w-[320px]">
          <Input placeholder="search" />
        </div>
      </div>
      <div className="flex flex-col gap-4 z-20 w-full text-white border text-sm border-border_dark rounded-md">
        <div className="flex flex-col w-full h-full overflow-auto bg-secondary_dark rounded-md">
          <div className="grid grid-cols-5 gap-5 text-secondary_text_dark items-center w-full p-4 border-b border-border_dark">
            <p className="w-full truncate col-span-1">Rank</p>
            <p className="w-full truncate col-span-2">Name</p>
            <p className="w-full truncate col-span-2">Proof Of Work(PoW)</p>
          </div>

          <div className="flex flex-col gap-2 w-full">
            {winners.map((b, i) => {
              return (
                <div
                  className="grid grid-cols-5 gap-8 items-center w-full p-4 text-sm"
                  key={i}
                >
                  <div className="">
                    {i > 2 ? (
                      "Shortlist"
                    ) : (
                      <div className="flex items-center gap-2">
                        <img
                          src={`/images/png/medal${i + 1}.png`}
                          className="h-4 w-auto"
                          alt=""
                        />
                        <p className="">
                          {i + 1} {i === 0 ? "st" : i === 1 ? "nd" : "rd"}
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="w-full flex items-center col-span-2 gap-2">
                    <img src={b.avatar} alt="" className="h-4 rounded" />
                    <p className="w-full truncate ">{b.name}</p>
                  </div>
                  <p className="w-full truncate col-span-2">{b.workLink}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
