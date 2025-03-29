"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { useEffect, useState, createContext } from "react";
import { useUserStore } from "../store";
import axios from "axios";
import { api_paths, paths } from "@/lib/urls";
import AdminNavbar from "@/components/wpl/common/AdminNavBar";
import { Toaster } from "@/components/ui/sonner";
import NextTopLoader from "nextjs-toploader";
import React from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

interface SidebarContextType {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  closeSidebar: () => void;
}

export const SidebarContext = createContext<SidebarContextType>({
  sidebarOpen: false,
  toggleSidebar: () => {},
  closeSidebar: () => {},
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const updateUserDetails = useUserStore(
    (state: any) => state.updateUserDetails
  );

  const getUserDetails = async (token: string) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}${api_paths.get_user}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200) {
        updateUserDetails(res?.data?.data);
        localStorage.setItem("token", token);
        localStorage.setItem("userDetails", JSON.stringify(res?.data?.data));
      }
    } catch (error) {
      localStorage.removeItem("token");
      updateUserDetails(undefined);
    }
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    let token = searchParams.get("token");
    if (token) {
      getUserDetails(token);
    } else {
      let token = localStorage.getItem("token");
      getUserDetails(token || "");
    }
  });

  const toggleSidebar = () => setSidebarOpen(prev => !prev);
  const closeSidebar = () => setSidebarOpen(false);

  const sidebarContextValue = {
    sidebarOpen,
    toggleSidebar,
    closeSidebar,
  };

  return (
    <html lang="en">
      <title>WPL Earn</title>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col bg-primary_dark h-screen text-primary_text_dark`}
      >
        <NextTopLoader color="#46CFB6" />
        <Toaster position="top-right" richColors />
        <img
          src="/images/png/dark-gradient.png"
          alt=""
          className="absolute top-0 z-0 h-screen"
        />
        {/* // This code creates a context provider for the sidebar, allowing components within it to access the sidebar's open/close state and toggle functionality.
        // It renders the AdminNavbar component, which includes a button to toggle the sidebar.
        // The children prop is rendered within a flex container that takes up the full width and height of the screen, with a top padding of 8vh. */}
        <SidebarContext.Provider value={sidebarContextValue}>
          <AdminNavbar toggleSidebar={toggleSidebar} />
          <div className="flex w-screen pt-[8vh] h-full z-20 pb-10 md:pb-0">
            {children}
          </div>
        </SidebarContext.Provider>
        {/* <Footer /> */}
      </body>
    </html>
  );
}
