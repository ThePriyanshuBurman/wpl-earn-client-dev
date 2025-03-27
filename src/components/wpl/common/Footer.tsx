import { paths } from "@/lib/urls";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="flex flex-col relative overflow-hidden bg-primary_dark border-t border-border_dark pt-8 md:pt-12">

      {/* Top Section */}
      <div className="flex flex-col lg:flex-row items-start w-full px-6 md:px-[8%] gap-16 md:gap-16">

        {/* Left Side - Logo, Description & Social Links */}
        <div className="flex flex-col gap-6 w-full lg:w-[60%]">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <img
                src="/images/svg/wpl-logo-light.svg"
                className="h-5 md:h-6 w-auto"
                alt="Wolf Pack League"
              />
              <p className="text-white font-medium font-orbitron text-lg md:text-xl">
                Wolf Pack League
              </p>
            </div>
            <p className="text-sm md:text-base text-gray-400">
              Discover high-paying crypto bounties, projects, and grants from the
              best Starknet companies in one place and apply using a single profile.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center text-white gap-4">
            <Link href="/dashboard">
              <img src="/images/svg/github.svg" className="h-5 md:h-6 w-5 md:w-6" alt="GitHub" />
            </Link>
            <Link href="/dashboard">
              <img src="/images/svg/x.svg" className="h-5 md:h-6 w-5 md:w-6" alt="Twitter" />
            </Link>
            <Link href="/dashboard">
              <img src="/images/svg/discord.svg" className="h-5 md:h-6 w-5 md:w-6" alt="Discord" />
            </Link>
          </div>

          {/* Powered By Section */}
          <div className="flex items-center gap-2">
            <p className="text-xs md:text-sm text-gray-400">Powered by</p>
            <img
              src="/images/svg/starknet-logo.svg"
              className="h-6 md:h-8 w-auto"
              alt="Starknet"
            />
          </div>
        </div>

        {/* Right Side - Links Grid */}
        <div className="w-full flex flex-wrap justify-between gap-6 md:gap-12 lg:gap-16">
          {/* Opportunities */}
          <div className="flex flex-col gap-4 w-[45%] sm:w-auto">
            <p className="text-sm md:text-base text-gray-200 font-medium">Opportunities</p>
            <div className="flex flex-col gap-2 text-[13px] md:text-sm text-gray-400">
              <Link href={paths.bounties} className="hover:text-primary_text_dark hover:underline">
                Bounties
              </Link>
              <Link href={paths.grants} className="hover:text-primary_text_dark hover:underline">
                Grants
              </Link>
              <Link href={paths.wpl_program} className="hover:text-primary_text_dark hover:underline">
                WPL Program
              </Link>
              <Link href={paths.leaderboard} className="hover:text-primary_text_dark hover:underline">
                Leaderboard
              </Link>
            </div>
          </div>

          {/* About */}
          <div className="flex flex-col gap-4 w-[45%] sm:w-auto">
            <p className="text-sm md:text-base text-gray-200 font-medium">About</p>
            <div className="flex flex-col gap-2 text-[13px] md:text-sm text-gray-400">
              <Link href="/" className="hover:text-primary_text_dark hover:underline">FAQ</Link>
              <Link href="/" className="hover:text-primary_text_dark hover:underline">Terms</Link>
              <Link href="/" className="hover:text-primary_text_dark hover:underline">Privacy Policy</Link>
              <Link href="/" className="hover:text-primary_text_dark hover:underline">Contact Us</Link>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Section */}
      <div className="flex flex-col items-center justify-center relative w-full h-[10vh] md:h-[12vh] mt-8">
        <p className="text-gray-200 text-sm md:text-base text-center">
          © 2025 WPL. All rights reserved.
        </p>
        <img
          src="/images/svg/footer-gradient.svg"
          className="absolute top-[130%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-[600px]"
          alt="Footer Background"
        />
      </div>

    </div>
  );
}
