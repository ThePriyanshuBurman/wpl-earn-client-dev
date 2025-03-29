import moment from "moment";
import Image from "next/image";

export default function UserCard({ url }: { url: string }) {
  return (
    <div className="flex items-center gap-3">
      <Image
        src={url}
        alt="avatar"
        width={10}
        height={10}
        className="h-[50px] w-[50px] object-cover rounded-md"
      />
      {/* <img
        src={url}
        alt=""
        className="h-[50px] w-[50px] object-cover rounded-md"
      /> */}
      <div className="flex flex-col w-full">
        <div className="flex items-center text-sm justify-between">
          <p className="text-sm">
            Samuel Harber
            {/* <span className="text-xs text-slate-500">@samharber</span> */}
          </p>
          <p className="text-[10px] text-slate-700">12s ago</p>
        </div>
        <p className="text-[10px] text-slate-700">Submitted a bounty</p>
      </div>
    </div>
  );
}
export function UserCardDark({ activity, i }: { activity: any; i: number }) {
  return (
    <div className="flex items-center gap-3" key={i}>
      {/* <Image
        src={
          activity?.imageUrl ? activity?.imageUrl : "/images/png/avatar2.png"
        }
        alt="avatar"
        width={10}
        height={10}
        className="h-[50px] w-[50px] object-cover rounded-md"
      /> */}
      <img
        src={activity?.imageUrl ? activity.imageUrl : "/images/png/avatar2.png"}
        alt=""
        className="h-[50px] w-[50px] object-cover rounded-md"
        onError={(e) => { e.currentTarget.src = "/images/png/avatar2.png"; }}
      />

      <div className="flex flex-col w-full">
        <div className="flex items-center text-sm justify-between">
          <p className="text-sm w-[70%] overflow-hidden">
            <span className="truncate">@{activity?.userName}</span>
            {/* <span className="text-sm text-secondary_text_dark ml-2 truncate">
              @{activity?.userName}
            </span> */}
          </p>
          <p className="text-xs text-secondary_text_dark">
            {moment(new Date(activity?.createdAt))?.fromNow()}
          </p>
        </div>
        <p className="text-xs text-secondary_text_dark">{activity?.message}</p>
      </div>
    </div>
  );
}
