"use client";

import { useUserStore } from "@/app/store";
import PageLoading from "@/components/wpl/components/PageLoading";
import { NotificationStates } from "@/lib/enums";
import { api_paths } from "@/lib/urls";
import axios from "axios";
import moment from "moment";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Notification() {
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const userDetails = useUserStore((state) => state.userDetails);
  // const [localUserDetails, setlocalUserDetails] = useState(
  //   localStorage.getItem("userDetails")
  //     ? JSON.parse(localStorage.getItem("userDetails") ?? "null")
  //     : null
  // );
  const getUserNotifications = async () => {
    try {
      setLoading(true);
      let token = localStorage.getItem("token");
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}${api_paths.notification}?userId=${userDetails?.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res) {
        setNotifications(res?.data?.data);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const openNotificationDetails = async ({ id }: { id: string }) => {
    try {
      let token = localStorage.getItem("token");
      await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}${api_paths.notification_viewed}?id=${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {}
  };

  useEffect(() => {
    getUserNotifications();
  }, []);
  return (
    <div className="flex w-[50%] h-full mx-auto">
      <div className="flex flex-col gap-6 pt-4 p-8 w-full h-full">
        <p className="text-2xl font-polysansbulky gradient-text py-1.5">
          Manage Notifications
        </p>

        {loading ? (
          <div className="flex p-4 items-center">
            <PageLoading />
          </div>
        ) : notifications?.length ? (
          <div className="flex flex-col gap-2 p-2">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <p>Total</p>
                <p className="bg-secondary_dark px-2 py-0.5 rounded-md text-sm">
                  {notifications?.length}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-2 max-h-[500px] w-full pr-4 overflow-y-auto">
              {notifications?.map((n: any, i: number) => {
                return (
                  <Link
                    href={`/notification/${n.id}`}
                    key={i}
                    onClick={() => {
                      openNotificationDetails({ id: n.id });
                    }}
                  >
                    <div
                      className={`flex items-start gap-4 rounded-lg p-2 cursor-pointer ${
                        n?.viewed
                          ? "bg-primary_dark border border-border_dark"
                          : "bg-secondary_dark"
                      }`}
                    >
                      {[
                        NotificationStates.BOUNTY_VERIFIED,
                        NotificationStates.SPONSOR_VERIFIED,
                        NotificationStates.GRANT_VERIFIED,
                        NotificationStates.NEW_SUBMISSION,
                      ].includes(n?.header) ? (
                        <img
                          src="/images/png/approved.png"
                          className="h-8"
                          alt=""
                        />
                      ) : [
                          NotificationStates.SPONOSOR_NOT_VERIFIED,
                          NotificationStates.BOUNTY_NOT_VERIFIED,
                          NotificationStates.GRANT_NOT_VERIFIED,
                        ].includes(n?.header) ? (
                        <img
                          src="/images/png/reject.png"
                          className="h-8"
                          alt=""
                        />
                      ) : (
                        <img
                          src="/images/png/trophy.png"
                          className="h-8"
                          alt=""
                        />
                      )}
                      <div className="flex flex-col gap-1 w-full">
                        <div className="flex items-center justify-between w-full ">
                          <p>{n?.header}</p>
                          <p className="text-xs text-secondary_text_dark">
                            {moment(new Date(n?.createdAt))?.fromNow()}
                          </p>
                        </div>
                        <p className="text-sm text-secondary_text_dark">
                          {n?.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="flex items-center w-full p-4">
            <p className="">No notifications!</p>
          </div>
        )}
      </div>
    </div>
  );
}
