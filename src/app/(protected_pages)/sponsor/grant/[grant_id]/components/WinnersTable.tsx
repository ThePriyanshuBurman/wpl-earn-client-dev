"use client";

import Input from "@/components/wpl/components/input";

export default function ({ winners }: { winners: any[] }) {
  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Header with Search Bar */}
      <div className="flex flex-wrap items-center justify-between pl-2">
        <p className="font-polysansbulky text-lg text-white">Winners 🏆</p>
        <div className="w-full sm:w-[320px]">
          <Input placeholder="Search" />
        </div>
      </div>

      {/* Winners List Table */}
      <div className="flex flex-col gap-4 w-full text-white border text-sm border-border_dark rounded-md">
        <div className="flex flex-col w-full h-full overflow-auto bg-secondary_dark rounded-md">
          {/* Table Header */}
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 sm:gap-5 text-secondary_text_dark items-center w-full p-4 border-b border-border_dark">
            <p className="w-full truncate col-span-1">Rank</p>
            <p className="w-full truncate col-span-2">Name</p>
            <p className="w-full truncate col-span-2">Proof Of Work (PoW)</p>
          </div>

          {/* Table Rows */}
          <div className="flex flex-col gap-2 w-full">
            {winners.map((b, i) => {
              // Determine the correct ranking text
              let rankText =
                i === 0 ? "1st" : i === 1 ? "2nd" : i === 2 ? "3rd" : "Shortlist";

              return (
                <div
                  className="grid grid-cols-3 sm:grid-cols-5 gap-3 sm:gap-8 items-center w-full p-4 text-sm"
                  key={i}
                >
                  {/* Rank Display */}
                  <div className="flex items-center gap-2">
                    {i < 3 ? (
                      <>
                        <img
                          src={`/images/png/medal${i + 1}.png`}
                          className="h-6 w-auto"
                          alt={`Medal ${i + 1}`}
                        />
                        <p className="font-semibold">{rankText}</p>
                      </>
                    ) : (
                      <p className="text-gray-400">{rankText}</p>
                    )}
                  </div>

                  {/* Name & Avatar */}
                  <div className="w-full flex items-center col-span-2 gap-2">
                    <img
                      src={b.avatar}
                      alt="User Avatar"
                      className="h-6 w-6 rounded-full object-cover"
                    />
                    <p className="w-full truncate">{b.name}</p>
                  </div>

                  {/* Proof of Work Link */}
                  <p className="w-full truncate col-span-2 break-all text-sky-400 hover:underline cursor-pointer">
                    {b.workLink}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
