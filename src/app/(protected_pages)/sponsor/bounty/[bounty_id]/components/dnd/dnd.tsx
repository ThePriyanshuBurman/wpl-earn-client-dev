import React, { useEffect } from "react";
import { useDragAndDrop } from "@formkit/drag-and-drop/react";
import { GripVertical } from "lucide-react";

export default function DnD({
  bountyDetails,
  selectedUers,
  setSelectedUsers,
}: {
  bountyDetails: any;
  selectedUers: any[];
  setSelectedUsers: any;
}) {
  const [parent, users] = useDragAndDrop<HTMLUListElement, any[]>(selectedUers);

  useEffect(() => {
    setSelectedUsers(users);
  }, [users]);

  return (
    <ul ref={parent} className="flex flex-col max-h-[250px] overflow-y-auto w-full">
      {users.map((user: any, i: number) => (
        <div
          className="grid grid-cols-3 md:grid-cols-9 items-center gap-2 p-2 text-xs sm:text-sm py-4 border border-border_dark bg-secondary_dark cursor-grab"
          key={user.uid}
        >
          <div className="flex justify-center">
            <GripVertical size={"14"} />
          </div>
          <div className="col-span-2 flex items-center">
            {i > 2 ? (
              "Shortlist"
            ) : (
              <div className="flex items-center gap-1 sm:gap-2">
                <img
                  src={`/images/png/medal${i + 1}.png`}
                  className="h-4 w-auto sm:h-5"
                  alt=""
                />
                <p className="whitespace-nowrap">
                  {i + 1} {i === 0 ? "st" : i === 1 ? "nd" : "rd"}
                </p>
              </div>
            )}
          </div>
          <p className="col-span-3 truncate min-w-0">{user?.user?.firstName}</p>
          <p className="col-span-3 truncate min-w-0">{bountyDetails?.rewardMap[i]}</p>
        </div>
      ))}
    </ul>
  );
}  