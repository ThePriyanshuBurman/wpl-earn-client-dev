"use client";

import { useEffect, useState } from "react";
import GrantCard from "./components/GrantCard";
import axios from "axios";
import { api_paths, paths } from "@/lib/urls";
import PageLoading from "@/components/wpl/components/PageLoading";

export default function Page() {
  const [grants, setGrants] = useState([]);
  const [loading, setLoading] = useState<any>({});

  const getBountyList = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}${api_paths.grant}`
      );

      if (res.status === 200) {
        setGrants(res?.data?.data);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBountyList();
  }, []);

  return (
    <div className="flex flex-col w-full h-full text-primary_text_dark relative">
      <div className="flex flex-col gap-12 w-full items-center  min-h-screen p-[8%] pt-[12%] z-20">
        <div className="flex flex-col gap-4 text-center">
          <p className="text-[55px] font-[700] font-polysansbulky leading-[58px] tracking-tight">
            Needs <span className="gradient-text">Funds</span> to build out your{" "}
            <span className="gradient-text">idea?</span>
          </p>
          <p className=" text-secondary_text_dark">
            Discover the complete list of crypto grants available to support{" "}
            your project. <br /> Fast, equity-free funding without the hassle.
          </p>
        </div>

        {loading ? (
          <PageLoading />
        ) : (
          <div className="grid grid-cols-3 gap-12 w-full">
            {grants.map((d: any, i) => {
              return <GrantCard data={d} key={i} index={i} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
}
