"use client";

import PageLoading from "@/components/wpl/components/PageLoading";
import { api_paths } from "@/lib/urls";
import axios from "axios";
import { MoveUpRight } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function SponsorPublicProfile() {
  const params = useParams();
  const username = params.username;
  const [userAvatar, setUserAvatar] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [sponsorDetails, setSponsorDetails] = useState<any>({});

  const getUserPublicProfile = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}${api_paths.get_sponsor_public_profile}?username=${username}`
      );
      if (res) {
        setSponsorDetails(res?.data?.data);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const getPresignedUrl = async ({ key }: { key: string }) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}${api_paths.get_presigned_url}?key=${key}`
      );
      if (res) {
        setUserAvatar(res?.data?.url);
      }
    } catch (error) {
      console.error("Error fetching presigned URL:", error);
    }
  };

  useEffect(() => {
    getUserPublicProfile();
  }, [username]);

  useEffect(() => {
    if (sponsorDetails?.companyLogo) {
      getPresignedUrl({ key: sponsorDetails.companyLogo });
    }
  }, [sponsorDetails]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  };

  return (
    <div className="flex flex-col py-[10%] w-full h-screen text-primary_text_dark relative overflow-hidden">
      {/* Subtle background animation */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-secondary_dark/20 to-transparent"
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      {loading ? (
        <div className="flex mx-auto">
          <PageLoading />
        </div>
      ) : Object.keys(sponsorDetails)?.length ? (
        <motion.div
          className="mx-auto flex flex-col gap-6 w-[40vw] bg-secondary_dark p-6 rounded-md border border-border_dark h-max shadow-lg relative z-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Verified Badge in Top-Right Corner */}
          {sponsorDetails?.status === "VERIFIED" && (
            <motion.div
              className="absolute top-4 right-4 flex items-center gap-1 bg-green-500/20 px-2 py-1 rounded-full border border-green-500/30"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              <img
                src="/images/png/verified.png"
                alt="Verified"
                className="h-4 w-4"
              />
              <p className="text-xs text-green-300 font-polysansbulky">Verified</p>
            </motion.div>
          )}

          {/* Avatar with hover effect */}
          <motion.div
            className="relative"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <img
              src={userAvatar || "/images/placeholder-avatar.png"}
              className="h-[80px] w-[80px] rounded-lg object-cover border border-border_dark"
              alt={`${sponsorDetails?.companyName} logo`}
            />
          </motion.div>

          {/* Company Name Header */}
          <motion.h1
            className="text-2xl font-polysansbulky text-primary_text_dark"
            variants={itemVariants}
          >
            {sponsorDetails?.companyName}
          </motion.h1>

          <div className="grid grid-cols-2 gap-4">
            <motion.div className="flex flex-col" variants={itemVariants}>
              <p className="text-sm text-secondary_text_dark">Username</p>
              <p className="font-medium">{sponsorDetails?.companyUserName}</p>
            </motion.div>
            <motion.div className="flex flex-col" variants={itemVariants}>
              <p className="text-sm text-secondary_text_dark">Entity Name</p>
              <p className="font-medium">{sponsorDetails?.entityName || "N/A"}</p>
            </motion.div>
            <motion.div className="flex flex-col" variants={itemVariants}>
              <p className="text-sm text-secondary_text_dark">Industry</p>
              <p className="font-medium">{sponsorDetails?.industry || "N/A"}</p>
            </motion.div>
            <motion.div className="flex flex-col" variants={itemVariants}>
              <p className="text-sm text-secondary_text_dark">Company URL</p>
              <a
                href={
                  sponsorDetails?.companyUrl?.startsWith("http")
                    ? sponsorDetails.companyUrl
                    : `https://${sponsorDetails?.companyUrl}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium hover:scale-105 transition-transform flex items-center gap-1 group"
              >
                {sponsorDetails?.companyUrl || "N/A"}
                {sponsorDetails?.companyUrl && (
                  <MoveUpRight className="w-4 h-4 group-hover:scale-110 transition-transform" />
                )}
              </a>
            </motion.div>
            <motion.div className="flex flex-col" variants={itemVariants}>
              <p className="text-sm text-secondary_text_dark">Twitter</p>
              <a
                href={`https://twitter.com/${sponsorDetails?.companyTwitter}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium hover:scale-105 transition-transform flex items-center gap-1 group"
              >
                {sponsorDetails?.companyTwitter
                  ? `@${sponsorDetails.companyTwitter}`
                  : "N/A"}
                {sponsorDetails?.companyTwitter && (
                  <MoveUpRight className="w-4 h-4 group-hover:scale-110 transition-transform" />
                )}
              </a>
            </motion.div>
            <motion.div
              className="flex flex-col col-span-2"
              variants={itemVariants}
            >
              <p className="text-sm text-secondary_text_dark">Company Bio</p>
              <p className="font-medium break-words">
                {sponsorDetails?.companyBio || "No bio available"}
              </p>
            </motion.div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          className="mx-auto flex flex-col gap-4 w-[40vw] bg-secondary_dark p-4 rounded-md border border-border_dark h-max shadow-lg"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <p className="mx-auto font-polysansbulky text-lg">
            No Sponsor Found
          </p>
        </motion.div>
      )}
    </div>
  );
}