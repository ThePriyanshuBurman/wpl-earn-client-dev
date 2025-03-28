"use client";

import RequiredLable from "@/components/wpl/common/RequiredLabel";
import BackButton from "@/components/wpl/components/backButton";
import {
  PrimaryButton,
  SecondaryButton,
} from "@/components/wpl/components/button";
import ImageInput from "@/components/wpl/components/ImageInput";
import { api_paths, paths } from "@/lib/urls";
import axios from "axios";
import { Plus, Sparkles } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Page() {
  const router = useRouter();
  const [skill, setSkill] = useState("");
  const [skills, setSkills] = useState<any>([]);
  const [curreny, setCurreny] = useState("USDC");
  const [loading, setLoading] = useState(false);

  const [grantDetails, setGrantDetails] = useState<any>(null);

  const handleCreateGrant = async () => {
    try {
      setLoading(true);
      let token = localStorage.getItem("token");
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}${api_paths.grant}`,
        {
          ...grantDetails,
          // skills: skills,
          prizeCurrency: curreny,
          responseTime: 3600,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status) {
        router.push(paths.sponsor_dashboard);
        toast.success("Grant created successfully.");
      }
    } catch (error: any) {
      toast.error(
        "Something went wrong! Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = ({ url }: { url: string }) => {
    setGrantDetails({
      ...grantDetails,
      logo: url,
    });
  };
  return (
    <div className="flex p-[4%] w-full">
      <div className="flex flex-col gap-6 w-full max-w-full sm:w-[70%] md:w-[60%] lg:w-[40%] h-full mx-auto text-white">
        <Link href={paths.sponsor_dashboard}>
          <BackButton />
        </Link>

        <div className="flex flex-col gap-2">
          <RequiredLable text="Grant Logo" />
          <ImageInput onInput={handleImageUpload} />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <p className="text-sm">Title of the Grant</p>
          <div className="flex items-center gap-4 rounded-lg bg-secondary_dark border border-border_dark px-4 text-sm">
            <div className="border-r h-full flex gap-2 text-yellow-500 border-border_dark items-center pr-4">
              <Sparkles size={"12"} />
              <p className="">Grant</p>
            </div>
            <input
              type="text"
              placeholder="Starknet kick-off"
              className="bg-transparent w-full focus:outline-none py-2"
              onInput={(e) => {
                setGrantDetails({
                  ...grantDetails,
                  // @ts-ignore
                  title: e.target.value,
                });
              }}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <p className="text-sm">Organisation handle</p>

          <input
            type="text"
            placeholder="starkware"
            className="rounded-lg bg-secondary_dark border border-border_dark text-sm px-4 w-full focus:outline-none py-2"
            onInput={(e) => {
              setGrantDetails({
                ...grantDetails,
                // @ts-ignore
                orgHandle: e.target.value,
              });
            }}
          />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <p className="text-sm">Organisation Description</p>

          <textarea
            rows={5}
            placeholder="Starkware helps in pushing various projects in the ecosystem"
            className="text-sm bg-secondary_dark rounded-md border border-border_dark focus:outline-none p-4"
            onInput={(e) => {
              setGrantDetails({
                ...grantDetails,
                // @ts-ignore
                orgDescription: e.target.value,
              });
            }}
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap w-full gap-2 mt-2">
            {skills.map((s: any, i: number) => {
              return (
                <div
                  key={i}
                  className="flex items-center bg-secondary_dark px-3 py-1 rounded-lg text-sm gap-2"
                >
                  {s}
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <p className="text-sm text-white">Select Prize Currency</p>

          <div className="flex items-center px-4 py-2 border border-border_dark rounded-md bg-secondary_dark">
            <img
              src={
                curreny === "USDC"
                  ? "/images/png/usdc.png"
                  : "/images/png/strk-icon.png"
              }
              className="h-5 w-auto"
              alt="Currency Icon"
            />

            <select
              className="bg-transparent focus:outline-none text-sm w-full cursor-pointer appearance-none text-white px-2"
              onChange={(e) => setCurreny(e.target.value)}
            >
              <option value="USDC" className="bg-secondary_dark text-white">USDC</option>
              <option value="STRK" className="bg-secondary_dark text-white">STRK</option>
            </select>
          </div>
        </div>


        <div className="flex flex-col gap-2 w-full">
          <p className="text-sm">Average Grant size</p>

          <div className="flex items-center gap-4 bg-secondary_dark border border-border_dark rounded-md">
            <div className="flex gap-2 items-center px-4 border-r border-border_dark h-full">
              <img
                src={
                  curreny === "USDC"
                    ? "/images/png/usdc.png"
                    : "/images/png/strk-icon.png"
                }
                className="h-4 w-auto"
                alt=""
              />
              <p>{curreny}</p>
            </div>
            <input
              type="number"
              placeholder="enter amount"
              className="bg-transparent py-2 focus:outline-none"
              onInput={(e) => {
                setGrantDetails({
                  ...grantDetails,
                  // @ts-ignore
                  avgGrantSize: Number(e.target.value),
                });
              }}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2 w-full">
          <p className="text-sm">Prize approved so far</p>

          <div className="flex items-center gap-4 bg-secondary_dark border border-border_dark rounded-md">
            <div className="flex gap-2 items-center px-4 border-r border-border_dark h-full">
              <img
                src={
                  curreny === "USDC"
                    ? "/images/png/usdc.png"
                    : "/images/png/strk-icon.png"
                }
                className="h-4 w-auto"
                alt=""
              />
              <p>{curreny}</p>
            </div>
            <input
              type="number"
              placeholder="enter amount"
              className="bg-transparent py-2 focus:outline-none"
              onInput={(e) => {
                setGrantDetails({
                  ...grantDetails,
                  // @ts-ignore
                  approvedAmount: Number(e.target.value),
                });
              }}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-sm">Average response time</p>

          <div className="flex items-center bg-secondary_dark border border-border_dark rounded-md px-4 py-2">
            <select
              name=""
              id=""
              className="bg-transparent focus:outline-none text-sm cursor-pointer appearance-none px-2 w-max text-white"
            >
              <option value="hours" className="bg-secondary_dark text-white">Hours</option>
              <option value="week" className="bg-secondary_dark text-white">Weeks</option>
            </select>

            <input
              type="number"
              placeholder="Enter time"
              className="bg-transparent py-1 px-2 focus:outline-none w-full text-sm text-white border-l border-border_dark"
            />
          </div>
        </div>


        <div className="flex flex-col gap-2 w-full">
          <p className="text-sm">What's the Grant about?</p>

          <textarea
            rows={5}
            placeholder="grant description"
            className="text-sm bg-secondary_dark rounded-md border border-border_dark focus:outline-none p-4"
            onInput={(e) => {
              setGrantDetails({
                ...grantDetails,
                // @ts-ignore
                grantDescription: e.target.value,
              });
            }}
          />
        </div>

        <div className="flex flex-col gap-2 w-full">
          <p className="text-sm">Link to the grant</p>

          <input
            type="text"
            placeholder="link"
            className="rounded-lg bg-secondary_dark border border-border_dark text-sm px-4 w-full focus:outline-none py-2"
            onInput={(e) => {
              setGrantDetails({
                ...grantDetails,
                // @ts-ignore
                link: e.target.value,
              });
            }}
          />
        </div>
        <div className="flex gap-4 w-max items-center text-sm mt-[4%] ml-auto">
          <Link href={paths.sponsor_dashboard}>
            <SecondaryButton>
              <div className="flex items-center gap-2 mx-auto">Cancel</div>
            </SecondaryButton>
          </Link>

          <div className="w-max">
            <PrimaryButton
              loading={loading}
              onClick={() => {
                handleCreateGrant();
              }}
            >
              <div className="flex items-center gap-2 mx-auto">
                Create Listing
              </div>
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );

}
