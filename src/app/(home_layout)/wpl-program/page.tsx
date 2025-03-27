import { BorderBeam } from "@/components/magicui/border-beam";
import { PrimaryButton } from "@/components/wpl/components/button";
import Card from "@/components/wpl/components/Card";
import HomeFaq from "@/components/wpl/home/HomeFaq";
import Link from "next/link";
import MarqueeDemo from "./components/marquee";

export default function Page() {
  return (
    <div className="flex flex-col overflow-x-hidden gap-12 h-full w-full text-primary_text_dark z-20 relative pb-[8%]">
      <img src="/images/png/wolf-bg.png" className="h-[75vh]" alt="" />
      <div className="flex flex-col gap-16 w-full mt-[6%] absolute top-0">
        <div className="flex flex-col items-center h-full px-[10%] pt-[5%]">
          <div className="flex flex-col gap-6 items-center m-auto">
            <div className="flex flex-col text-center gap-2">
              <p className="text-[75px] font-[700] font-polysansbulky leading-[65px] tracking-tight text-primary_text_dark">
                Build Create Earn
                <br />
                <span className="gradient-text pr-0.5"> Repeat</span>
              </p>
            </div>
            <div className="flex relative">
              <p className="font-medium">
                Apply now to join the pack and start earning
              </p>
            </div>

            <div className="flex items-center gap-6 font-medium rounded-full relative">
              <Link
                href="https://form.typeform.com/to/jPgPdA8l"
                target="_blank"
              >
                <PrimaryButton className=" px-10 py-3 !rounded-full">
                  Join the Pack
                </PrimaryButton>
              </Link>
              <BorderBeam
                size={60}
                initialOffset={40}
                className="from-transparent via-[#46cfb6] to-transparent"
                transition={{
                  type: "spring",
                  stiffness: 60,
                  damping: 20,
                }}
              />
            </div>
          </div>
        </div>

        {/*  */}
        <div className="flex flex-col items-center gap-2 mx-auto">
          <p className="text-xs text-secondary_text_dark">POWERED BY</p>
          <img
            src="/images/png/SW_logo_offWhite.png"
            className="h-[20px] w-auto"
            alt=""
          />
        </div>
      </div>

      <div className="flex flex-col gap-28 items-center">
        <div className="flex flex-col gap-8">
          <p className="mx-auto w-max font-polysansbulky text-3xl gradient-text">
            MORE ABOUT WPL
          </p>

          <div className="w-[70vw]">
            <div className="flex flex-col gap-4 col-span-2 mx-auto">
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <div className="flex flex-col gap-8 w-full">
                    <div className="bg-primary_dark rounded-md w-full">
                      <img
                        src="/images/png/wolf-avatar.png"
                        className="h-fit w-[50%] object-cover mx-auto rounded-md"
                        alt=""
                      />
                    </div>

                    <div className="flex flex-col gap-6 px-2">
                      <div className="flex flex-col gap-2">
                        <p className="font-polysansbulky gradient-text text-xl">
                          Are you a developer/builder?
                        </p>
                        <p className="text-sm">
                          You can now join the pack, and approved members can
                          request to complete bounties, earn based on milestones
                          & build your proof of work
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card>
                  <div className="flex flex-col gap-8 w-full">
                    <div className="bg-primary_dark rounded-md w-full">
                      <img
                        src="/images/png/wolf-avatar.png"
                        className="h-fit w-[50%] object-cover mx-auto rounded-md"
                        alt=""
                      />
                    </div>

                    <div className="flex flex-col gap-6 px-2">
                      <div className="flex flex-col gap-2">
                        <p className="font-polysansbulky gradient-text text-xl">
                          Are you non-technical but enjoy contributing?
                        </p>
                        <p className="text-sm">
                          You can write, create video content, evangelise, earn
                          your rank and earn as a member of the pack
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              <Card>
                <div className="flex flex-col gap-8 w-full px-2 py-1">
                  <div className="flex flex-col gap-2">
                    <p className="font-polysansbulky gradient-text text-3xl">
                      Leaderboard Tiers
                    </p>
                    <p className="text-sm">
                      Advance through Leaderboard Tiers by earning points and
                      claim rewards at each level (Puppy to Dire Wolf). Register
                      on OnlyDust with your GitHub account, follow the rules,
                      and complete KYC to receive rewards.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>

        <div className="flex gap-36 w-[85vw]">
          <div className="flex flex-col gap-4 w-[30%]">
            <div className="flex flex-col gap-1">
              <p className="text-3xl gradient-text font-polysansbulky">
                WPL EARN
              </p>
              <p className="text-sm text-secondary_text_dark">
                Join, Participate, Contribute and Earn!
              </p>
            </div>
            <PrimaryButton>
              <p>Coming Soon</p>
            </PrimaryButton>
          </div>

          <div className="grid grid-cols-2 w-full gap-8">
            <Card>
              <div className="flex flex-col gap-6">
                <img
                  src="/images/png/wpl-program/Vector-1.png"
                  className="h-auto w-[40px]"
                  alt=""
                />
                <div className="flex flex-col gap-1">
                  <p className="font-polysansbulky gradient-text">
                    Earn Onchain
                  </p>
                  <p className="text-sm text-secondary_text_dark">
                    Complete projects, contribute and unlock earning
                    opportunities
                  </p>
                </div>
              </div>
            </Card>
            <Card>
              <div className="flex flex-col gap-6">
                <img
                  src="/images/png/wpl-program/Vector-2.png"
                  className="h-auto w-[40px]"
                  alt=""
                />
                <div className="flex flex-col gap-1">
                  <p className="font-polysansbulky gradient-text">
                    Share Proof of Work
                  </p>
                  <p className="text-sm text-secondary_text_dark">
                    Build a verifiable body of work
                  </p>
                </div>
              </div>
            </Card>
            <Card>
              <div className="flex flex-col gap-6">
                <img
                  src="/images/png/wpl-program/Vector-3.png"
                  className="h-auto w-[40px]"
                  alt=""
                />
                <div className="flex flex-col gap-1">
                  <p className="font-polysansbulky gradient-text">
                    High Quality Resources
                  </p>
                  <p className="text-sm text-secondary_text_dark">
                    Access to resources, information & support to help you grow
                    and succeed
                  </p>
                </div>
              </div>
            </Card>
            <Card>
              <div className="flex flex-col gap-6">
                <img
                  src="/images/png/wpl-program/Vector-4.png"
                  className="h-auto w-[40px]"
                  alt=""
                />
                <div className="flex flex-col gap-1">
                  <p className="font-polysansbulky gradient-text">
                    Access to an exclusive community
                  </p>
                  <p className="text-sm text-secondary_text_dark">
                    Be a part of the pack
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <p className="mx-auto w-max font-polysansbulky text-3xl gradient-text">
            Join the wolfpack, earn your rank!
          </p>
          <MarqueeDemo />
        </div>

        <div className="flex flex-col gap-8 mx-auto w-[60%]">
          <p className="mx-auto w-max font-polysansbulky text-3xl gradient-text">
            FAQ
          </p>
          <div className="flex w-full">
            <HomeFaq />
          </div>
        </div>
      </div>
    </div>
  );
}
