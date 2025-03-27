"use client";

import { BorderBeam } from "@/components/magicui/border-beam";
import { api_paths, paths } from "@/lib/urls";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function GrantCard({
  data,
  index,
}: {
  data: any;
  index: number;
}) {
  const router = useRouter();

  const [grantLogo, setGrantLogo] = useState<string>();

  const getPresignedUrl = async ({ key }: { key: string }) => {
    let token = localStorage.getItem("token");
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}${api_paths.get_presigned_url}?key=${key}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res) {
      setGrantLogo(res?.data?.url);
    }
  };

  useEffect(() => {
    getPresignedUrl({ key: data?.logo });
  }, [data]);

  return (
    <div
      className="w-full h-max bg-[#0c1517] border border-[#172527] rounded-lg"
      key={index}
    >
      <img
        src={grantLogo}
        className="rounded-t-lg h-[250px] w-full object-cover"
        alt=""
      />

      <div className="flex flex-col gap-6 p-4">
        <div className="flex flex-col gap-2 ">
          <p className="text-lg">{data?.title}</p>
          <p className="flex items-center gap-2 text-sm">
            <img
              src={
                data?.prizeCurrency === "USDC"
                  ? "/images/png/usdc.png"
                  : "/images/png/strk-icon.png"
              }
              className="h-4 w-auto"
              alt=""
            />
            {data?.avgGrantSize} {data?.prizeCurrency}
          </p>
        </div>

        <Link href={`${paths.grants}/${data.id}`} target="_blank">
          <button className="relative border border-[#46cfb6] hover:bg-[#46cfb6] transition-all hover:text-black py-2 rounded-lg w-full">
            <BorderBeam
              size={40}
              initialOffset={20}
              className="from-transparent via-green-500 to-transparent"
              transition={{
                type: "spring",
                stiffness: 60,
                damping: 20,
              }}
            />
            Apply Now
          </button>
        </Link>
      </div>
    </div>
  );
}
