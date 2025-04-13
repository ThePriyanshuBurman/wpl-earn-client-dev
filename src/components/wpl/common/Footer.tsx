import { paths } from "@/lib/urls";
import Link from "next/link";
import { Suspense } from "react";
import Globe from "../components/Globe";

export default function Footer() {
  return (
    <div className="flex flex-col relative overflow-hidden bg-primary_dark border-t border-border_dark pt-10 pb-6 px-4 sm:px-8 md:px-[8%]">
      {/* Top Content */}
      <div className="flex flex-col md:flex-row items-start gap-8 w-full">
        {/* Left Section */}
        <div className="flex flex-col gap-6 md:flex-[2]">
          {/* Logo and Description */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <img
                src="/images/svg/wpl-logo-light.svg"
                className="h-5 w-auto"
                alt="WPL Logo"
              />
              <p className="text-white font-medium font-orbitron text-sm sm:text-base">
                Wolf Pack League
              </p>
            </div>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
              Discover high paying crypto bounties and grants from the best Starknet
              projects in one place and apply to them using a single profile.
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="hover:opacity-80">
              <img src="/images/svg/github.svg" className="h-4" alt="GitHub" />
            </Link>
            <Link href="/dashboard" className="hover:opacity-80">
              <img src="/images/svg/x.svg" className="h-4" alt="X" />
            </Link>
            <Link href="/dashboard" className="hover:opacity-80">
              <img src="/images/svg/discord.svg" className="h-4" alt="Discord" />
            </Link>
          </div>

          {/* Powered By */}
          <div className="flex flex-col gap-1 w-max">
            <p className="text-[10px] text-gray-400">Powered by</p>
            <Link
              href="https://starkware.co/"
              target="_blank"
              className="relative z-10"
            >
              <img
                src="/images/svg/StarkWare logo off_white.svg"
                className="h-6 w-auto object-contain"
                alt="StarkWare Logo"
              />
            </Link>
          </div>
        </div>

        {/* Right Section - Links */}
        <div className="grid grid-cols-2 gap-6 w-full md:w-auto md:flex-1">
          <div className="flex flex-col gap-3">
            <p className="text-sm text-gray-200 font-medium">Opportunities</p>
            <div className="flex flex-col gap-1.5 text-xs text-gray-400">
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

          <div className="flex flex-col gap-3">
            <p className="text-sm text-gray-200 font-medium">About</p>
            <div className="flex flex-col gap-1.5 text-xs text-gray-400">
              <Link href="/" className="hover:text-primary_text_dark hover:underline">
                FAQ
              </Link>
              <Link href="/" className="hover:text-primary_text_dark hover:underline">
                Terms
              </Link>
              <Link href="/" className="hover:text-primary_text_dark hover:underline">
                Privacy Policy
              </Link>
              <Link href="/" className="hover:text-primary_text_dark hover:underline">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Content */}
      <div className="relative mt-12 w-full h-32 sm:h-40 flex flex-col justify-end items-center">
        {/* Gradient/Globe */}
        <img
          src="/images/svg/footer-gradient.svg"
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0"
          alt="Fallback Gradient"
        />
        {/* Globe (optional) */}
        {/* <Suspense fallback={<></>}>
          <Globe />
        </Suspense> */}

        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-[13px] text-gray-200 text-center">
          <p>WPL© 2025 All rights reserved.</p>

          <div className="flex items-center gap-1">
            <span>Made with</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="#46CFB6"
              stroke="#46CFB6"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-[13px] w-[13px]"
            >
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
            <span>by</span>
            <Link
              href="https://roguedevs.co/"
              target="_blank"
              className="text-[#46CFB6] hover:underline transition-colors duration-200"
            >
              RogueDevs
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
