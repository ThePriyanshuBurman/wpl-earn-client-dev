"use client";

import { api_paths, paths } from "@/lib/urls";
import { CircleCheckBig, CircleX, Plus, Sparkles, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  PrimaryButton,
  SecondaryButton,
} from "@/components/wpl/components/button";
import axios from "axios";
import TemplateModal from "../dashboard/components/templateModal";
import SelectWpl from "@/components/wpl/components/select";
import Input from "@/components/wpl/components/input";
import VerifyListingModal from "../components/VerifyListingModal";
import { toast } from "sonner";
import Link from "next/link";
import { useUserStore } from "@/app/store";
import { convertToRaw, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import ConfirmModal from "@/components/wpl/common/ConfirmModal";
import BackButton from "@/components/wpl/components/backButton";
import RequiredLable from "@/components/wpl/common/RequiredLabel";
import debounce from "lodash.debounce";
import ImageInput from "@/components/wpl/components/ImageInput";
import dynamic from "next/dynamic";

// Dynamically import WYSIWYGEditor with SSR disabled
const WYSIWYGEditor = dynamic(() => import("./components/Editor"), {
  ssr: false,
});

export default function Page() {
  const router = useRouter();

  const [curreny, setCurreny] = useState("USDC");
  const [skill, setSkill] = useState("");
  const [rewards, setRewards] = useState<any>([]);
  const [rewardMap, setRewardMap] = useState<any>([]);
  const [totalPosition, setTotalPosition] = useState<any>(1);
  const [skills, setSkills] = useState<any>([]);
  const [slug, setSlug] = useState("");
  const [openCreateBountyModal, setOpenCreateBountyModal] = useState(true);
  const [openVerifyListingModal, setOpenVerifyListingModal] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const userDetails = useUserStore((state) => state.userDetails);
  const [editorState, setEditorState] = useState<EditorState | null>(null); // Initialize as null
  const [bountyDetails, setBountyDetails] = useState<any>(null);
  const [social, setSocial] = useState<any>(null);
  const [slugCheckLoading, setSlugCheckLoading] = useState(false);
  const [slugAvailable, setSlugAvailable] = useState<any>(undefined);
  const [remainingWords, setRemainingWords] = useState(120);

  // Initialize editorState only on client-side mount
  useEffect(() => {
    setEditorState(EditorState.createEmpty());
  }, []);

  const handleCurrencyChange = (e: any) => {
    setCurreny(e.target.value);
    setBountyDetails({ ...bountyDetails, denomination: e.target.value });
  };

  const handleRewardsDelete = (id: number) => {
    setRewardMap(rewardMap.filter((r: any) => r.id !== id));
  };

  const handleRewardMap = (e: any, id: any) => {
    const updatedData = rewardMap.map((reward: any) =>
      reward.id === id ? { ...reward, amount: Number(e.target.value) } : reward
    );
    setRewardMap(updatedData);
  };

  const handleCreateBounty = async ({
    type,
  }: {
    type: "draft" | "publish" | "request-approval";
  }) => {
    try {
      let totalRewardAmont = 0;
      let rewardMapArray = rewardMap.map((d: any) => d.amount);
      for (let i = 0; i < rewardMapArray.length; i++) {
        totalRewardAmont += rewardMapArray[i];
      }

      if (totalRewardAmont !== rewards) {
        toast.error("Improper Rewards Distribution!");
        return;
      }
      let bountyState = "DRAFT";
      if (type === "publish") bountyState = "POSTED";
      if (type === "request-approval") bountyState = "REQUEST_APPROVAL";

      let token = localStorage.getItem("token");
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}${api_paths.create_bounties}`,
        {
          ...bountyDetails,
          description: editorState
            ? draftToHtml(convertToRaw(editorState.getCurrentContent()))
            : "",
          skills: skills,
          rewardMap: rewardMap.map((d: any) => d.amount),
          denomination: curreny,
          poc: social,
          slug: slug,
          state: bountyState,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status) {
        if (type === "draft") {
          toast.success("Bounty moved to draft successfully.");
        }
        router.push(paths.sponsor_dashboard);
      }
    } catch (error: any) {
      toast.error("Something went wrong! Please try again later.");
    }
  };

  const validateBountyInput = (bountyDetails: any) => {
    if (!bountyDetails?.logo) {
      toast.error("Please upload bounty logo");
      return false;
    }

    if (!bountyDetails?.title) {
      toast.error("Please enter bounty title");
      return false;
    }

    if (!bountyDetails?.shortDescription) {
      toast.error("Please enter bounty short description");
      return false;
    }
    if (!bountyDetails?.description) {
      toast.error("Please enter bounty description");
      return false;
    }

    if (!bountyDetails?.rewards || bountyDetails.rewards <= 0) {
      toast.error("Please enter a valid reward amount");
      return false;
    }

    if (!bountyDetails?.endDate || bountyDetails.endDate <= Date.now() / 1000) {
      toast.error("Please select a valid future date");
      return false;
    }

    if (!skills || skills.length === 0) {
      toast.error("Please add at least one skill");
      return false;
    }

    if (!social) {
      toast.error("Please enter point of contact");
      return false;
    }

    if (!rewardMap || rewardMap.length === 0) {
      toast.error("Please add reward distribution");
      return false;
    }

    if (!curreny) {
      toast.error("Please select a denomination");
      return false;
    }

    return true;
  };

  const handleCreateBountyClick = ({ type }: { type: "draft" | "publish" }) => {
    if (validateBountyInput(bountyDetails)) {
      if (!Number.isInteger(rewards)) {
        toast.error("Total rewards should be a valid integer");
        return;
      }

      if (type === "draft") {
        handleCreateBounty({ type: "draft" });
      } else if (userDetails?.sponsor?.status === "VERIFIED") {
        setOpenConfirmModal(true);
      } else {
        setOpenVerifyListingModal(true);
      }
    }
  };

  const handleCheckSlug = async (slug: string) => {
    setSlugCheckLoading(true);
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}${api_paths.slug_available}?slug=${slug}`
      );

      if (res) {
        setSlugAvailable(res?.data?.available);
      }
    } catch (error: any) {
    } finally {
      setSlugCheckLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputText = e.currentTarget.value;

    if (inputText.length <= 120) {
      setBountyDetails({
        ...bountyDetails,
        shortDescription: inputText,
      });
      setRemainingWords(120 - inputText.length);
    } else {
      const limitedText = inputText.slice(0, 120);
      setBountyDetails({
        ...bountyDetails,
        shortDescription: limitedText,
      });
      setRemainingWords(0);
    }
  };

  const handleImageUpload = ({ url }: { url: string }) => {
    setBountyDetails({
      ...bountyDetails,
      logo: url,
    });
  };

  // Render nothing until editorState is initialized
  if (!editorState) {
    return null; // or a loading spinner
  }

  return (
    <>
      <TemplateModal
        open={openCreateBountyModal}
        setOpenCreateBountyModal={setOpenCreateBountyModal}
        close={() => setOpenCreateBountyModal(false)}
      />
      <VerifyListingModal
        open={openVerifyListingModal}
        close={() => setOpenVerifyListingModal(false)}
        success={() => handleCreateBounty({ type: "request-approval" })}
      />
      <ConfirmModal
        open={openConfirmModal}
        loading={false}
        close={() => setOpenConfirmModal(false)}
        success={() => {
          handleCreateBounty({ type: "publish" });
        }}
        text="Are you sure! you want to publish?"
      />
      <div className="flex flex-col gap-8 pt-[2%] py-[4%] w-[80%] mx-auto">
        <Link href={paths.sponsor_dashboard}>
          <BackButton />
        </Link>
        <div className="flex gap-12 w-full h-full mx-auto text-white">
          <div className="flex flex-col gap-6 w-[70%]">
            <div className="flex flex-col gap-2">
              <RequiredLable text="Bounty Logo" />
              <ImageInput onInput={handleImageUpload} />
            </div>

            <div className="flex flex-col gap-2 w-full">
              <RequiredLable text="Listing title" />
              <div className="flex items-center gap-4 rounded-lg bg-secondary_dark border border-border_dark px-4 text-sm">
                <div className="border-r h-full flex gap-2 text-yellow-500 border-border_dark items-center pr-4">
                  <Sparkles size={"12"} />
                  <p className="">Bounty</p>
                </div>
                <input
                  type="text"
                  placeholder="WPL backend <> Integrate whole user flow"
                  className="bg-transparent w-full focus:outline-none py-2"
                  onInput={(e) => {
                    setBountyDetails({
                      ...bountyDetails,
                      // @ts-ignore
                      title: (e.target as HTMLInputElement).value,
                    });
                  }}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2 w-full">
              <RequiredLable
                text={`Short Description  ${remainingWords} words remaining`}
              />
              <textarea
                rows={3}
                maxLength={120}
                placeholder="Integrate a flow for user wherein users can come onto platform and check listed bounties. User can submit their Proof of Work for a particular bounty and get rewards at the end of bounty"
                className="text-sm bg-secondary_dark rounded-lg border border-border_dark focus:outline-none p-4"
                onInput={handleInputChange}
              />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <RequiredLable text="Description" />
              <div className="border border-border_dark rounded-lg">
                <WYSIWYGEditor
                  editorState={editorState}
                  setEditorState={(newEditorState: any) => {
                    setEditorState(newEditorState);
                    const rawContent = convertToRaw(newEditorState.getCurrentContent());
                    const htmlContent = draftToHtml(rawContent);
                    setBountyDetails({
                      ...bountyDetails,
                      description: htmlContent,
                    });
                  }}
                />
              </div>
            </div>

            <div className="flex gap-4 w-max items-center text-sm ml-auto">
              <SecondaryButton
                onClick={() => handleCreateBountyClick({ type: "draft" })}
              >
                <div className="flex items-center gap-2 mx-auto">
                  Move to Draft
                </div>
              </SecondaryButton>

              <PrimaryButton
                onClick={() => handleCreateBountyClick({ type: "publish" })}
              >
                <div className="flex items-center gap-2 mx-auto">
                  Publish Bounty
                </div>
              </PrimaryButton>
            </div>
          </div>
          <div className="flex flex-col gap-6 w-[30%]">
            <div className="flex flex-col gap-2">
              <RequiredLable text="Rewards" />
              <div className="flex items-center gap-4 bg-secondary_dark border border-border_dark rounded-lg">
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
                  <select
                    name=""
                    id=""
                    className="bg-transparent focus-visible:outline-none text-sm"
                    onChange={handleCurrencyChange}
                  >
                    <option value="USDC">USDC</option>
                    <option value="STRK">STRK</option>
                  </select>
                </div>
                <input
                  type="number"
                  placeholder="enter amount"
                  className="bg-transparent py-2 focus:outline-none"
                  onInput={(e) => {
                    const value = Number((e.target as HTMLInputElement).value);
                    setRewards(value);
                    setBountyDetails({
                      ...bountyDetails,
                      rewards: value,
                    });
                  }}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <RequiredLable text="Deadline (in Asia/Calcutta)" />
              <input
                type="datetime-local"
                placeholder="enter amount"
                style={{ colorScheme: "dark" }}
                className="bg-secondary_dark border text-white border-border_dark py-2 px-4 rounded-lg focus:outline-none"
                onInput={(e) => {
                  setBountyDetails({
                    ...bountyDetails,
                    endDate: new Date((e.target as HTMLInputElement).value).getTime() / 1000,
                  });
                }}
              />
            </div>

            <div className="flex flex-col gap-2">
              <RequiredLable text="Skills Needed" />
              <div className="flex items-center w-full bg-secondary_dark rounded-lg px-2">
                <input
                  type="text"
                  className="bg-transparent w-full py-2 focus:outline-none px-2"
                  placeholder="enter skill"
                  value={skill}
                  onInput={(e) => {
                    setSkill((e.target as HTMLInputElement).value);
                  }}
                />
                <button
                  onClick={() => {
                    if (skill) {
                      setSkill("");
                      setSkills([...skills, skill]);
                    }
                  }}
                  className="flex items-center gap-1 bg-primary_dark px-2 py-1 text-sm rounded-lg"
                >
                  <Plus size={"12"} />
                  Add
                </button>
              </div>
              <div className="flex flex-wrap w-full gap-2 mt-2">
                {skills.map((s: any, i: number) => (
                  <div
                    key={i}
                    className="flex items-center bg-secondary_dark px-3 py-1 rounded-lg text-sm gap-2"
                  >
                    {s}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <RequiredLable text="Total positions" />
              <div className="flex w-full">
                <SelectWpl
                  value={totalPosition}
                  onSelect={(value: any) => {
                    setTotalPosition(Number(value));
                  }}
                  placeholder="Select total positions"
                  options={[
                    { label: "1", value: 1 },
                    { label: "2", value: 2 },
                    { label: "3", value: 3 },
                  ]}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex w-full items-center justify-between">
                <RequiredLable text="Allot Rewards" />
                <button
                  disabled={rewardMap?.length === totalPosition}
                  onClick={() => {
                    setRewardMap([
                      ...rewardMap,
                      {
                        id: Math.floor(1000 + Math.random() * 9000),
                        amount: 0,
                      },
                    ]);
                  }}
                  className="flex items-center gap-2 bg-secondary_dark px-2 py-1 rounded-lg text-sm disabled:cursor-not-allowed disabled:text-gray-400"
                >
                  <Plus size={"12"} /> Add
                </button>
              </div>
              <div className="flex flex-col gap-4">
                {rewardMap?.map((r: any, i: number) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 h-full bg-secondary_dark border border-border_dark px-4 rounded-lg"
                  >
                    <div className="flex w-[100px] items-center gap-2 border-r border-border_dark pr-4 h-full">
                      <img
                        src={`/images/png/medal${i + 1}.png`}
                        className="h-4 w-auto mt-[1px]"
                        alt=""
                      />
                      <p className="text-nowrap">
                        {i + 1}{" "}
                        {i + 1 === 1 ? "st" : i + 1 === 2 ? "nd" : "rd"}
                      </p>
                    </div>
                    <input
                      type="text"
                      className="bg-transparent py-2 focus:outline-none text-sm w-full"
                      placeholder="Enter reward"
                      onInput={(e) => handleRewardMap(e, r.id)}
                    />
                    <button
                      onClick={() => {
                        handleRewardsDelete(r.id);
                      }}
                      className="text-red-500"
                    >
                      <Trash size={"14"} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div>
                <p className="text-sm">Customize URL (slug)</p>
                <p className="text-sm text-secondary_text_dark">
                  https://earn.wpl.fun/{slug}
                </p>
              </div>
              <div className="flex flex-col gap-1 col-span-2 w-full">
                <Input
                  placeholder="enter slug"
                  onInput={debounce((e: any) => {
                    const value = (e.target as HTMLInputElement).value;
                    if (value) {
                      handleCheckSlug(value);
                    } else {
                      setSlugAvailable(undefined);
                    }
                    setSlug(value);
                  }, 1000)}
                />
                <div className="flex items-center">
                  {!slugCheckLoading && slug && slugAvailable ? (
                    <div className="flex items-center gap-1 text-sm text-green-500">
                      <CircleCheckBig size={"14"} /> slug available
                    </div>
                  ) : !slugCheckLoading && slug && !slugAvailable ? (
                    <div className="flex items-center gap-1 text-sm text-red-500">
                      <CircleX size={"14"} /> slug not available
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <RequiredLable text="Social link" />
              <div className="flex items-center gap-4 bg-secondary_dark border border-border_dark rounded-lg">
                <div className="flex gap-2 items-center px-4 border-r border-border_dark h-full">
                  <img
                    src={
                      curreny === "DISCORD"
                        ? "/images/svg/discord.svg"
                        : "/images/svg/telegram.svg.STARTTLS"
                    }
                    className="h-4 w-auto"
                    alt=""
                  />
                  <select
                    name=""
                    id=""
                    className="bg-transparent focus-visible:outline-none text-sm"
                    onChange={(e) => {
                      // Assuming you want to track the social platform type
                      setSocial({ ...social, platform: e.target.value });
                    }}
                  >
                    <option value="DISCORD">Discord</option>
                    <option value="TELEGRAM">Telegram</option>
                  </select>
                </div>
                <input
                  type="text"
                  placeholder="https://link.com"
                  className="bg-transparent py-2 focus:outline-none"
                  onInput={(e) => {
                    setSocial({ ...social, url: (e.target as HTMLInputElement).value });
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}