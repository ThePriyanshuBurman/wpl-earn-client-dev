// "use client";

// import {
//   BellRing,
//   BookUser,
//   DollarSign,
//   FileClock,
//   HeartHandshake,
//   List,
//   Users,
// } from "lucide-react";
// import { useEffect, useState } from "react";
// import { paths } from "@/lib/urls";
// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";


// export default function SideBar({

//   activeSideBar,
//   setActiveSideBar,
// }: {
//   activeSideBar: string;
//   setActiveSideBar: any;
// }) {
//   const pathname = usePathname();
//   return (
//     <div className="flex flex-col p-4 gap-2 w-[18%] text-sm border-r border-border_dark">
//       <button
//         onClick={() => {
//           setActiveSideBar("listing");
//         }}
//         className={`flex items-center gap-2 py-2 px-4 text-start rounded-md duration-300 ${
//           activeSideBar === "listing" ? "bg-green-600/10" : ""
//         }`}
//       >
//         <List size={"14"} />
//         My Listing
//       </button>
//       <button
//         onClick={() => {
//           setActiveSideBar("rewards");
//         }}
//         className={`flex items-center gap-2 py-2 px-4 text-start rounded-md duration-300 ${
//           activeSideBar === "rewards" ? "bg-green-600/10" : ""
//         }`}
//       >
//         <DollarSign size={"14"} />
//         Manage Rewards
//       </button>
//       <button
//         onClick={() => {
//           setActiveSideBar("notification");
//         }}
//         className={`flex items-center gap-2 py-2 px-4 text-start rounded-md duration-300 ${
//           activeSideBar === "notification" ? "bg-green-600/10" : ""
//         }`}
//       >
//         <BellRing size={"14"} />
//         Notifications
//       </button>

//       <button
//         onClick={() => {
//           setActiveSideBar("details");
//         }}
//         className={`flex items-center gap-2 py-2 px-4 text-start rounded-md duration-300 ${
//           activeSideBar === "details" ? "bg-green-600/10" : ""
//         }`}
//       >
//         <BookUser size={"14"} />
//         Details
//       </button>
//       <button
//         onClick={() => {
//           setActiveSideBar("help");
//         }}
//         className={`flex items-center gap-2 py-2 px-4 text-start rounded-md duration-300 ${
//           activeSideBar === "help" ? "bg-green-600/10" : ""
//         }`}
//       >
//         <HeartHandshake size={"14"} />
//         Get Help
//       </button>
//     </div>
//   );
// }

"use client";

import {
  BellRing,
  BookUser,
  DollarSign,
  HeartHandshake,
  List,
  ArrowLeftCircle
} from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function SideBar({
  activeSideBar,
  setActiveSideBar,
  showDrawer,
  setShowDrawer,
}: {
  activeSideBar: string;
  setActiveSideBar: (value: string) => void;
  showDrawer: boolean;
  setShowDrawer: (value: boolean) => void;
}) {
  const pathname = usePathname();

  return (
    <>
      {/* Toggle Button */}
      <div className="text-center">
        <button
          className="text-white bg-secondary_dark hover:bg-secondary_dark  font-medium rounded-lg text-sm px-5 py-2.5"
          type="button"
          onClick={() => setShowDrawer(true)}
        >
          <ArrowLeftCircle size={20} />
        </button>
      </div>

      {/* Drawer Component */}
      <div
        className={`fixed top-12 left-0 z-40 w-64 h-screen p-4 overflow-y-auto bg-secondary_dark dark:bg-gray-800 transform ${
          showDrawer ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        {/* Header */}
        <div className="flex justify-end items-center mb-4">
          <button
            type="button"
            onClick={() => setShowDrawer(false)}
            className="text-gray-400 rounded-lg p-1.5 justify-end"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>

        {/* Sidebar Items */}
        <div className="space-y-2">
          {[
            { id: "listing", label: "My Listing", icon: <List size={16} /> },
            { id: "rewards", label: "Manage Rewards", icon: <DollarSign size={16} /> },
            { id: "notification", label: "Notifications", icon: <BellRing size={16} /> },
            { id: "details", label: "Details", icon: <BookUser size={16} /> },
            { id: "help", label: "Get Help", icon: <HeartHandshake size={16} /> },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveSideBar(item.id);
                setShowDrawer(false); // Auto-close drawer
              }}
              className={`w-full flex items-center gap-3 p-2 text-sm rounded-lg ${
                activeSideBar === item.id
                  ? "bg-green-600/10 text-green-700 dark:text-green-300"
                  : "text-white"
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}



