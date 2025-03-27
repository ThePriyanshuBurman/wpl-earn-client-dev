"use client";

import { Particles } from "@/components/magicui/particles";
import { Toaster } from "@/components/ui/sonner";
import Footer from "@/components/wpl/common/Footer";
import NavBar from "@/components/wpl/common/NavBar";
import { api_paths, paths } from "@/lib/urls";
import Providers from "@/providers";
import axios from "axios";
import { Geist, Geist_Mono } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import { useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";
import "../globals.css";
import { useUserStore } from "../store";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const [theme, settheme] = useLocalStorage("theme", "");
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

  return (
    <html lang="en">
      <title>WPL Earn</title>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col bg-primary_dark`}
      >
        <Providers>
          <NextTopLoader color="#46CFB6" />
          <Toaster position="top-right" richColors />
          <img
            src="/images/png/dark-gradient.png"
            alt=""
            className="absolute top-0 z-0"
          />
          <Particles
            className="absolute inset-0 z-0"
            quantity={100}
            ease={80}
            color={"#3de273"}
            refresh
          />
          <NavBar />
          {/* <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        > */}
          {children}
          {/* <div className="flex w-screen min-h-screen">{children}</div> */}
          {/* </ThemeProvider> */}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
