"use client";

import { BorderBeam } from "@/components/magicui/border-beam";
import Card from "@/components/wpl/components/Card";
import HomeFaq from "@/components/wpl/home/HomeFaq";
import LoginModal from "@/components/wpl/home/LoginModal";
import SignUpModal from "@/components/wpl/home/SignUpModal";
import { CheckCheck } from "lucide-react";
import { useState } from "react";

export default function Page() {
  const [openSignUpModal, setOpenSignUpModal] = useState(false);

  return (
    <>
        <SignUpModal
            open={openSignUpModal}
            close={() => setOpenSignUpModal(false)}
        />
        <div className="flex flex-col gap-12 mt-20 h-full w-full text-primary_text_dark z-20 px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-20 w-full">
                <div className="flex flex-col items-center h-full px-4 sm:px-10 pt-20">
                    <div className="flex flex-col gap-6 items-center m-auto">
                        <div className="flex flex-col text-center gap-2">
                            {/* Use responsive text sizes */}
                            <p className="text-3xl sm:text-4xl md:text-5xl font-bold leading-snug tracking-tight text-primary_text_dark">
                                Hiring is hard <br /> Posting
                                <span className="gradient-text pr-0.5"> bounties</span> is not
                            </p>
                        </div>
                        <div className="flex relative">
                            <p className="font-medium text-center">
                                Find the best talent in crypto, by simply posting gigs
                            </p>
                        </div>

                        <div className="flex items-center gap-4 sm:gap-6 font-medium">
                            <button
                                onClick={() => setOpenSignUpModal(true)}
                                className="gradient-button text-black px-6 sm:px-8 py-3 rounded-full relative"
                            >
                                Get started
                                <BorderBeam
                                    size={60}
                                    initialOffset={40}
                                    className="from-transparent via-white-500 to-transparent"
                                    transition={{
                                        type: "spring",
                                        stiffness: 60,
                                        damping: 20,
                                    }}
                                />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex w-full sm:w-4/5 mx-auto rounded-lg relative">
                    <div className="absolute bg-gradient-to-b from-[#021614]/20 to-[#010E10] h-full w-full rounded-lg"></div>
                    <img
                        src="/images/png/sponsor-dashboard.png"
                        className="rounded-lg w-full h-auto"
                        alt=""
                    />
                </div>

                <div className="flex flex-col px-4 sm:px-10 items-center gap-12">
                    <div className="flex flex-col text-center text-3xl md:text-5xl font-bold">
                        <p>Find talent via</p>
                        <span className="gradient-text">bounties & grants</span>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 w-full sm:w-4/5 mx-auto">
                        <div className="w-full sm:w-1/2">
                            <Card>
                                <div className="flex flex-col gap-8 w-full">
                                    <div className="bg-primary_dark rounded-md w-full">
                                        <img
                                            src="/images/png/coins.png"
                                            className="h-48 sm:h-64 w-full object-cover mx-auto"
                                            alt=""
                                        />
                                    </div>

                                    <div className="flex flex-col gap-6 px-2">
                                        <div className="flex flex-col gap-2">
                                            <p className="font-bold gradient-text text-xl md:text-2xl">
                                                Bounties
                                            </p>
                                            <p className="text-sm">
                                                Bounties are listings where everyone completes a given
                                                scope of work, and competes for the prize pool.
                                            </p>
                                        </div>

                                        <div className="flex flex-col gap-2">
                                            {[
                                                "Great for awareness campaigns where you want to reach the most people possible.",
                                                "Get multiple options to choose from.",
                                                "Examples: Twitter Threads, Deep-Dives, Memes, Product Feedback, and more.",
                                            ].map((text, index) => (
                                                <div key={index} className="flex items-start gap-2 text-secondary_text_dark">
                                                    <CheckCheck size={"16"} className="mt-1" />
                                                    <span className="text-sm">{text}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>

                        <div className="w-full sm:w-1/2">
                            <Card>
                                <div className="flex flex-col gap-8 w-full">
                                    <div className="bg-primary_dark rounded-md w-full">
                                        <img
                                            src="/images/png/bag.png"
                                            className="h-48 sm:h-64 w-full object-cover mx-auto"
                                            alt=""
                                        />
                                    </div>

                                    <div className="flex flex-col gap-6 px-2">
                                        <div className="flex flex-col gap-2">
                                            <p className="font-bold gradient-text text-xl md:text-2xl">
                                                Grants
                                            </p>
                                            <p className="text-sm">
                                                Projects are freelance gigs — people apply with their
                                                proposals but don’t begin working until you pick them.
                                            </p>
                                        </div>

                                        <div className="flex flex-col gap-2">
                                            {[
                                                "Perfect for work that requires collaboration and iteration.",
                                                "Single output that is specific to your exact needs.",
                                                "Examples: Full Stack Development, Hype Video Production, Hiring a Community Manager, and more.",
                                            ].map((text, index) => (
                                                <div key={index} className="flex items-start gap-2 text-secondary_text_dark">
                                                    <CheckCheck size={"16"} className="mt-1" />
                                                    <span className="text-sm">{text}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>

                <div className="flex w-full sm:w-4/5 mx-auto rounded-lg relative">
                    <div className="absolute flex items-center z-20 bg-primary_dark/90 h-full w-full px-6 sm:px-12">
                        <div className="flex flex-col gap-8 items-start">
                            <div className="flex flex-col gap-2">
                                <div className="flex flex-col gap-1 font-bold text-3xl md:text-4xl">
                                    <p>Mapping</p>
                                    <span className="gradient-text">The Network</span>
                                </div>
                                <p className="text-sm text-secondary_text_dark">
                                    Join, Participate, Contribute, and Earn!
                                </p>
                            </div>
                            <div className="flex flex-wrap gap-4 sm:gap-10 w-full">
                                {[
                                    { label: "21K", desc: "Discord" },
                                    { label: "500K", desc: "Twitter" },
                                    { label: "$4m", desc: "Community GDP" },
                                ].map(({ label, desc }, index) => (
                                    <div key={index} className="flex flex-col gap-1">
                                        <p className="font-bold text-3xl md:text-4xl gradient-text">{label}</p>
                                        <p className="text-sm text-secondary_text_dark">{desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <img
                        src="/images/png/wolf.png"
                        className="scale-x-[-1] rounded-lg w-full h-auto"
                        alt=""
                    />
                </div>

                <div className="flex px-4 sm:px-6 lg:px-8 pb-10 z-20">
                    <div className="flex flex-col gap-8 mx-auto w-full sm:w-3/4">
                        <p className="mx-auto font-bold text-3xl gradient-text">FAQ</p>
                        <div className="flex w-full">
                            <HomeFaq />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
);
}