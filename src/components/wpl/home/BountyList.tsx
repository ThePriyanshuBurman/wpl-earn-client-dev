"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ListFilter } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { api_paths, paths } from "@/lib/urls";

import Tabs from "../common/Tabs";
import PageLoading from "../components/PageLoading";
import FilterModal from "./FilterModal";
import { ListCardDarkFlip } from "./ListCard";

export default function BountyList() {
  const [bountyStatus, setBountyStatus] = useState("POSTED");
  const [bounties, setBounties] = useState([]);
  const [openFilterModal, setOpenFilterModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const getBountyList = async ({ status }: { status: string }) => {
    try {
      setLoading(true);
      let url =
        status !== "all"
          ? `${process.env.NEXT_PUBLIC_API_URL}${api_paths.bounty}?state=${status}`
          : `${process.env.NEXT_PUBLIC_API_URL}${api_paths.bounty}`;
      const res = await axios.get(url);

      if (res.status === 200) {
        setBounties(res?.data?.data);
      }
    } catch (error) {}
    setLoading(false);
  };

  let items = [
    {
      label: "Live",
      value: "POSTED",
    },
    {
      label: "All",
      value: "all",
    },
    {
      label: "Completed",
      value: "CLOSED",
    },
  ];

  const handleTabChange = (value: string) => {
    setBountyStatus(value);
    getBountyList({ status: value });
  };

  useEffect(() => {
    getBountyList({ status: "POSTED" });
  }, []);

  return (
    <>
      <FilterModal
        open={openFilterModal}
        close={() => setOpenFilterModal(false)}
      />

      <div className="flex flex-col gap-6">
        <div className="w-full flex items-center justify-between border-b border-border_dark">
          <Tabs items={items} active={bountyStatus} onClick={handleTabChange} />

          <div className="flex items-center gap-4">
            <button
              onClick={() => setOpenFilterModal(true)}
              className="flex items-center gap-2 text-sm bg-secondary_dark border border-border_dark rounded-lg px-4 py-2"
            >
              Filters
              <ListFilter size={"13"} />
            </button>
          </div>
        </div>

        {loading ? (
          <PageLoading />
        ) : (
          <div className="flex flex-col gap-4">
            {bounties?.map((d: any, i) => {
              return <ListCardDarkFlip data={d} key={i} index={i} />;
            })}
          </div>
        )}
      </div>
    </>
  );
}
