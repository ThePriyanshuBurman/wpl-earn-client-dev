"use client";

import BackButton from "@/components/wpl/components/backButton";
import PageLoading from "@/components/wpl/components/PageLoading";
import { NotificationStates } from "@/lib/enums";
import { api_paths, paths } from "@/lib/urls";
import axios from "axios";
import moment from "moment";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const params = useParams();
  const notification_id = params.notification_id;
  const [loading, setLoading] = useState<any>(true);
  const [notificationDetails, setNotificationDetails] = useState<any>({});

  const getNotificationDetail = async () => {
    try {
      setLoading(true);
      let token = localStorage.getItem("token");
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}${api_paths.get_notification_detail}?id=${notification_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res) {
        setNotificationDetails(res?.data?.data);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getNotificationDetail();
  }, []);

  return (
    <div className="flex flex-col items-center w-full h-full mt-[4%]">
      {loading ? (
        <PageLoading />
      ) : (
        <div className="flex flex-col gap-6 w-full max-w-sm md:max-w-md lg:max-w-lg px-4">
          {/* Back Button */}
          <BackButton onClick={() => history.back()} />
  
          {/* Notification Image */}
          {[
            NotificationStates.BOUNTY_VERIFIED,
            NotificationStates.SPONSOR_VERIFIED,
            NotificationStates.GRANT_VERIFIED,
            NotificationStates.NEW_SUBMISSION,
          ].includes(notificationDetails?.header) ? (
            <img
              src="/images/png/approved.png"
              className="w-12 h-12 md:w-14 md:h-14 mx-auto"
              alt="Approved"
            />
          ) : [
              NotificationStates.SPONOSOR_NOT_VERIFIED,
              NotificationStates.BOUNTY_NOT_VERIFIED,
              NotificationStates.GRANT_NOT_VERIFIED,
            ].includes(notificationDetails?.header) ? (
            <img
              src="/images/png/reject.png"
              className="w-12 h-12 md:w-14 md:h-14 mx-auto"
              alt="Rejected"
            />
          ) : (
            <img
              src="/images/png/trophy.png"
              className="w-12 h-12 md:w-14 md:h-14 mx-auto"
              alt="Trophy"
            />
          )}
  
          {/* Notification Header & Timestamp */}
          <div className="flex flex-col md:flex-row items-center w-full justify-between text-center md:text-left">
            <p className="text-sm md:text-base font-medium">{notificationDetails?.header}</p>
            <p className="text-xs text-secondary_text_dark">
              {moment(new Date(notificationDetails?.createdAt))?.fromNow()}
            </p>
          </div>
  
          {/* Notification Description */}
          <p className="text-sm md:text-base text-center md:text-left">
            {notificationDetails?.description}
          </p>
        </div>
      )}
    </div>
  );
}  