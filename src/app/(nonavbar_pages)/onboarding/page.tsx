"use client";
import { PrimaryButton } from "@/components/wpl/components/button";
import Card from "@/components/wpl/components/Card";
import { api_paths, paths } from "@/lib/urls";
import { CheckCheck } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex flex-col gap-12 h-screen w-full">
      <div className="flex items-center gap-12 w-[60%] mx-auto">
        <div className="w-full">
          <Card>
            <div className="flex flex-col gap-8">
              <div className="bg-primary_dark rounded-md">
                <img
                  src="/images/png/talent.png"
                  className="h-[300px] w-auto mx-auto"
                  alt=""
                />
              </div>

              <div className="flex flex-col gap-6 px-2">
                <div className="flex flex-col gap-2">
                  <p className="font-polysansbulky gradient-text text-3xl">
                    Continue as Talent
                  </p>
                  <p className="text-sm">
                    Create a profile to start submitting, and get notified on
                    new work opportunities
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex items-start gap-2 text-secondary_text_dark">
                    <CheckCheck size={"16"} className="mt-1" />
                    <span className="text-sm ">Contribute to top projects</span>
                  </div>
                  <div className="flex items-start gap-2 text-secondary_text_dark">
                    <CheckCheck size={"16"} className="mt-1" />
                    <span className="text-sm ">Build your top resume</span>
                  </div>
                  <div className="flex items-start gap-2 text-secondary_text_dark">
                    <CheckCheck size={"16"} className="mt-1" />
                    <span className="text-sm ">Get paid in crypto</span>
                  </div>
                </div>

                <Link className="w-full" href={paths.user_onboarding}>
                  <PrimaryButton>
                    <p>Continue as a talent</p>
                  </PrimaryButton>
                </Link>
              </div>
            </div>
          </Card>
        </div>
        <div className="w-full">
          <Card>
            <div className="flex flex-col gap-8">
              <div className="bg-primary_dark rounded-md">
                <img
                  src="/images/png/sponsor.png"
                  className="h-[300px] w-auto mx-auto"
                  alt=""
                />
              </div>

              <div className="flex flex-col gap-6 px-2">
                <div className="flex flex-col gap-2">
                  <p className="font-polysansbulky gradient-text text-3xl">
                    Continue as Sponsor
                  </p>
                  <p className="text-sm">
                    List a bounty or a freelance gig for your project and find
                    your next contributor.
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex items-start gap-2 text-secondary_text_dark">
                    <CheckCheck size={"16"} className="mt-1" />
                    <span className="text-sm ">
                      Get in front of 10,000 weekly visitors
                    </span>
                  </div>
                  <div className="flex items-start gap-2 text-secondary_text_dark">
                    <CheckCheck size={"16"} className="mt-1" />
                    <span className="text-sm ">
                      20+ templated to choose from
                    </span>
                  </div>
                  <div className="flex items-start gap-2 text-secondary_text_dark">
                    <CheckCheck size={"16"} className="mt-1" />
                    <span className="text-sm ">100% free</span>
                  </div>
                </div>

                <Link href={paths.sponsor_onboarding}>
                  <PrimaryButton>
                    <p>Continue as a contributor</p>
                  </PrimaryButton>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
