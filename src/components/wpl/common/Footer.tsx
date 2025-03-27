import { paths } from "@/lib/urls";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="flex flex-col relative overflow-hidden bg-primary_dark border-t border-border_dark pt-[4%]">
      <div className="flex items-start w-full px-[8%]">
        <div className="flex flex-col gap-8 w-[70%]">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <img
                src="/images/svg/wpl-logo-light.svg"
                className="h-[20px] w-auto"
                alt=""
              />
              <p className="text-white font-medium font-orbitron">
                Wolf Pack league
              </p>
            </div>
            <p className="text-[13px] text-gray-400">
              Discover high paying crypto bounties, projects and grants from the
              best Starknet <br /> companies in one place and apply to them
              using a single profile.
            </p>
          </div>

          <div className="flex items-center text-white gap-4">
            <Link
              href="/dashboard"
              className="hover:text-primary_text_dark hover:underline"
            >
              <img src="/images/svg/github.svg" className="h-[15px]" alt="" />
            </Link>
            <Link
              href="/dashboard"
              className="hover:text-primary_text_dark hover:underline"
            >
              <img src="/images/svg/x.svg" className="h-[15px]" alt="" />
            </Link>
            <Link
              href="/dashboard"
              className="hover:text-primary_text_dark hover:underline"
            >
              <img src="/images/svg/discord.svg" className="h-[15px]" alt="" />
            </Link>
          </div>

          <div className="flex flex-col gap-2 w-max">
            <p className="text-[10px] text-gray-400">Powered by</p>
            <img
              src="/images/svg/starknet-logo.svg"
              className="h-[24px] w-auto"
              alt=""
            />
          </div>
        </div>

        <div className="w-[30%] h-full grid grid-cols-3 gap-6">
          <div className="flex flex-col gap-4">
            <p className="text-sm text-gray-200 font-medium">Opportunities</p>
            <div className="flex flex-col gap-2 text-[13px] text-gray-400">
              <Link
                href={paths.bounties}
                className="hover:text-primary_text_dark hover:underline"
              >
                Bounties
              </Link>
              <Link
                href={paths.grants}
                className="hover:text-primary_text_dark hover:underline"
              >
                Grants
              </Link>
              <Link
                href={paths.wpl_program}
                className="hover:text-primary_text_dark hover:underline"
              >
                WPL Program
              </Link>
              <Link
                href={paths.leaderboard}
                className="hover:text-primary_text_dark hover:underline"
              >
                Leaderboard
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-sm text-gray-200 font-medium">Categories</p>
            <div className="flex flex-col gap-2 text-[13px] text-gray-400">
              <Link
                href="/"
                className="hover:text-primary_text_dark hover:underline"
              >
                Content
              </Link>
              <Link
                href="/"
                className="hover:text-primary_text_dark hover:underline"
              >
                Design
              </Link>
              <Link
                href="/"
                className="hover:text-primary_text_dark hover:underline"
              >
                Web3
              </Link>
              <Link
                href="/"
                className="hover:text-primary_text_dark hover:underline"
              >
                Development
              </Link>
              <Link
                href="/"
                className="hover:text-primary_text_dark hover:underline"
              >
                Others
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-sm text-gray-200 font-medium">About</p>
            <div className="flex flex-col gap-2 text-[13px] text-gray-400">
              <Link
                href="/"
                className="hover:text-primary_text_dark hover:underline"
              >
                FAQ
              </Link>
              <Link
                href="/"
                className="hover:text-primary_text_dark hover:underline"
              >
                Terms
              </Link>
              <Link
                href="/"
                className="hover:text-primary_text_dark hover:underline"
              >
                Privacy Policy
              </Link>
              <Link
                href="/"
                className="hover:text-primary_text_dark hover:underline"
              >
                Contact US
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-end relative w-full h-[20vh]">
        <p className="mx-auto pb-[2%] text-gray-200 text-[13px]">
          © 2025 WPL. All rights reserved.
        </p>
        <img
          src="/images/svg/footer-gradient.svg"
          className="absolute top-[130%] left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          alt=""
        />
      </div>
    </div>
  );
}
