"use client";

import { AnimatedList } from "@/components/magicui/animated-list";
import { cn } from "@/lib/utils";
import UserCard, { UserCardDark } from "./UserCard";
import axios from "axios";
import { useEffect, useState } from "react";
import { api_paths } from "@/lib/urls";

const monkeyNFTs = [
  "/images/png/avatar1.png",
  "/images/png/avatar2.png",
  "/images/png/avatar3.png",
  "/images/png/avatar1.png",
  "/images/png/avatar2.png",
  "/images/png/avatar3.png",
  "/images/png/avatar1.png",
  "/images/png/avatar2.png",
  "/images/png/avatar3.png",
  "/images/png/avatar1.png",
  "/images/png/avatar2.png",
  "/images/png/avatar3.png",
  "/images/png/avatar1.png",
  "/images/png/avatar2.png",
  "/images/png/avatar3.png",
  "/images/png/avatar1.png",
  "/images/png/avatar2.png",
  "/images/png/avatar3.png",
  "/images/png/avatar1.png",
  "/images/png/avatar2.png",
  "/images/png/avatar3.png",
  "/images/png/avatar1.png",
  "/images/png/avatar2.png",
  "/images/png/avatar3.png",
  "/images/png/avatar1.png",
  "/images/png/avatar2.png",
  "/images/png/avatar3.png",
  "/images/png/avatar1.png",
  "/images/png/avatar2.png",
  "/images/png/avatar3.png",
  "/images/png/avatar1.png",
  "/images/png/avatar2.png",
  "/images/png/avatar3.png",
  "/images/png/avatar1.png",
  "/images/png/avatar2.png",
  "/images/png/avatar3.png",
  "/images/png/avatar1.png",
  "/images/png/avatar2.png",
  "/images/png/avatar3.png",
  "/images/png/avatar1.png",
  "/images/png/avatar2.png",
  "/images/png/avatar3.png",
];

let notifications = [
  {
    name: "Payment received",
    description: "Magic UI",
    time: "15m ago",
    icon: "💸",
    color: "#00C9A7",
  },
  {
    name: "User signed up",
    description: "Magic UI",
    time: "10m ago",
    icon: "👤",
    color: "#FFB800",
  },
  {
    name: "New message",
    description: "Magic UI",
    time: "5m ago",
    icon: "💬",
    color: "#FF3D71",
  },
  {
    name: "New event",
    description: "Magic UI",
    time: "2m ago",
    icon: "🗞️",
    color: "#1E86FF",
  },
];

notifications = Array.from({ length: 10 }, () => notifications).flat();

export function AnimatedListDemo({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex h-[400px] w-full flex-col overflow-hidden",
        className
      )}
    >
      <AnimatedList>
        {monkeyNFTs.map((url, idx) => (
          <UserCard url={url} key={idx} />
          //   <Notification {...item} key={idx} />
        ))}
      </AnimatedList>
    </div>
  );
}

export function AnimatedListDark({ className }: { className?: string }) {
  const [activity, setActivity] = useState([]);
  const getUserNotifications = async () => {
    try {
      let token = localStorage.getItem("token");
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}${api_paths.get_activity}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res) {
        setActivity(res?.data?.data?.reverse());
      }
    } catch (error) {}
  };

  useEffect(() => {
    getUserNotifications();
  }, []);
  return (
    <div
      className={cn(
        "relative flex h-[400px] w-full flex-col overflow-hidden",
        className
      )}
    >
      <AnimatedList>
        {activity?.length
          ? activity.map((activity, idx) => (
              <div key={idx}>
                <UserCardDark activity={activity} i={idx} />
              </div>
              //   <Notification {...item} key={idx} />
            ))
          : ""}
      </AnimatedList>
    </div>
  );
}
