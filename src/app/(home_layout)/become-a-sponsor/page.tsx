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
      <div className="flex flex-col gap-12 mt-[6%] h-full w-full text-primary_text_dark z-20">
        <div className="flex flex-col gap-20 w-full">
          <div className="flex flex-col items-center h-full px-[10%] pt-[5%]">
            <div className="flex flex-col gap-6 items-center m-auto">
              <div className="flex flex-col text-center gap-2">
                <p className="text-[55px] font-[700] font-polysansbulky leading-[58px] tracking-tight text-primary_text_dark">
                  Hiring is hard <br /> Posting
                  <span className="gradient-text pr-0.5"> bounties</span> is not
                </p>
              </div>
              <div className="flex relative">
                <p className="font-medium">
                  Find the best talent in crypto, by simply posting gigs
                </p>
              </div>

              <div className="flex items-center gap-6 font-medium">
                <button
                  onClick={() => setOpenSignUpModal(true)}
                  className="gradient-button text-black px-10 py-3 rounded-full relative"
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

          <div className="flex w-[80%] mx-auto rounded-lg relative">
            <div className="absolute bg-gradient-to-b from-[#021614]/20 to-[#010E10] h-full w-full rounded-lg"></div>
            <img
              src="/images/png/sponsor-dashboard.png"
              className="rounded-lg"
              alt=""
            />
          </div>

          <div className="flex flex-col px-[10%] items-center gap-12">
            <div className="flex flex-col text-center text-5xl font-polysansbulky h-full">
              <p>find talent via </p>
              <span className="gradient-text">bounties & grants</span>
            </div>

            <div className="flex items-center gap-12 w-full">
              <div className="w-full">
                <Card>
                  <div className="flex flex-col gap-8 w-full">
                    <div className="bg-primary_dark rounded-md w-full">
                      <img
                        src="/images/png/coins.png"
                        className="h-[300px] w-auto mx-auto"
                        alt=""
                      />
                    </div>

                    <div className="flex flex-col gap-6 px-2">
                      <div className="flex flex-col gap-2">
                        <p className="font-polysansbulky gradient-text text-3xl">
                          Bounties
                        </p>
                        <p className="text-sm">
                          Bounties are listings where everyone completes a given
                          scope of work, and competes for the prize pool
                        </p>
                      </div>

                      <div className="flex flex-col gap-2">
                        <div className="flex items-start gap-2 text-secondary_text_dark">
                          <CheckCheck size={"16"} className="mt-1" />
                          <span className="text-sm ">
                            Great for awareness campaigns where you want to
                            reach the most people possible
                          </span>
                        </div>
                        <div className="flex items-start gap-2 text-secondary_text_dark">
                          <CheckCheck size={"16"} className="mt-1" />
                          <span className="text-sm ">
                            Get multiple options to choose from
                          </span>
                        </div>
                        <div className="flex items-start gap-2 text-secondary_text_dark">
                          <CheckCheck size={"16"} className="mt-1" />
                          <span className="text-sm ">
                            Examples: Twitter Threads, Deep-Dives, Memes,
                            Product Feedback, and more
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
              <div className="w-full">
                <Card>
                  <div className="flex flex-col gap-8 w-full">
                    <div className="bg-primary_dark rounded-md w-full">
                      <img
                        src="/images/png/bag.png"
                        className="h-[300px] w-auto mx-auto"
                        alt=""
                      />
                    </div>

                    <div className="flex flex-col gap-6 px-2">
                      <div className="flex flex-col gap-2">
                        <p className="font-polysansbulky gradient-text text-3xl">
                          Grants
                        </p>
                        <p className="text-sm">
                          Projects are freelance gigs — people apply with their
                          proposals but don’t begin working until you pick them
                        </p>
                      </div>

                      <div className="flex flex-col gap-2">
                        <div className="flex items-start gap-2 text-secondary_text_dark">
                          <CheckCheck size={"16"} className="mt-1" />
                          <span className="text-sm ">
                            Perfect for work that requires collaboration and
                            iteration
                          </span>
                        </div>
                        <div className="flex items-start gap-2 text-secondary_text_dark">
                          <CheckCheck size={"16"} className="mt-1" />
                          <span className="text-sm ">
                            Single output that is specific to your exact needs
                          </span>
                        </div>
                        <div className="flex items-start gap-2 text-secondary_text_dark">
                          <CheckCheck size={"16"} className="mt-1" />
                          <span className="text-sm ">
                            Examples: Full Stack Development, Hype Video
                            Production, Hiring a Community Manager, and more
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>

          <div className="flex w-[80%]  mx-auto rounded-lg relative">
            <div className="absolute flex items-center z-20 bg-primary_dark/90 h-full w-full px-20">
              <div className="flex flex-col gap-8 items-start">
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col gap-2 font-polysansbulky text-5xl">
                    <p className="">Mapping</p>
                    <span className="gradient-text">The Network</span>
                  </div>
                  <p className="text-sm text-secondary_text_dark">
                    Join, Participate, Contribute and Earn!
                  </p>
                </div>
                <div className="flex w-max gap-14">
                  <div className="flex flex-col gap-1">
                    <p className="font-polysansbulky text-5xl gradient-text">
                      21K
                    </p>
                    <p className="text-sm text-secondary_text_dark">Discord</p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="font-polysansbulky text-5xl gradient-text">
                      500K
                    </p>
                    <p className="text-sm text-secondary_text_dark">Twitter</p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="font-polysansbulky text-5xl gradient-text">
                      $4m
                    </p>
                    <p className="text-sm text-secondary_text_dark">
                      Community GDP
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <img
              src="/images/png/wolf.png"
              className="scale-x-[-1] rounded-lg"
              alt=""
            />
          </div>

          <div className="flex px-[8%] pb-[8%] z-20">
            <div className="flex flex-col gap-8 mx-auto w-[70%]">
              <p className="mx-auto w-max font-polysansbulky text-3xl gradient-text">
                FAQ
              </p>
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
