"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import Input from "@/components/wpl/components/input";
import PageLoading from "@/components/wpl/components/PageLoading";
import { api_paths } from "@/lib/urls";
import axios from "axios";
import debounce from "lodash.debounce";
import { useEffect, useState } from "react";

export default function Leaderboard() {
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [metaData, setMetaData] = useState<any>({});
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc"); // New state for sort order

  const getData = async ({
    page,
    search,
  }: {
    page: number;
    search?: string;
  }) => {
    try {
      if (page <= 1) {
        setLoading(true);
      }
      let token = localStorage.getItem("token");
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}${api_paths.leaderboard}?limit=20&page=${page}&search=${search}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res) {
        let newData = res?.data?.data;
        if (page > 1) {
          setLeaderboard([...leaderboard, ...newData]);
        } else {
          setLeaderboard(newData);
        }
        setMetaData(res?.data?.pagination);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const onPageChange = (page: number) => {
    getData({ page: page, search: searchValue });
  };

  const onScroll = (e: any) => {
    if (e?.target) {
      const { scrollTop, scrollHeight, clientHeight } = e.target;
      let percentage = Number(
        (((scrollTop + clientHeight) / scrollHeight) * 100).toFixed(0)
      );

      if (percentage >= 99 && !loading) {
        if (metaData?.total / 20 > page && !loading) {
          setPage(page + 1);
          onPageChange(page + 1);
        }
      }
    }
  };

  useEffect(() => {
    getData({ page: page, search: searchValue });
  }, []);

  const handleSearch = debounce((query) => {
    setSearchValue(query);
    getData({ page: 1, search: query });
  }, 500);

  // Function to sort leaderboard by cumulativeLeaderboard
  const sortLeaderboard = (data: any[]) => {
    return [...data].sort((a, b) => {
      const pointsA = Number(a.cumulativeLeaderboard) || 0;
      const pointsB = Number(b.cumulativeLeaderboard) || 0;
      return sortOrder === "desc" ? pointsB - pointsA : pointsA - pointsB;
    });
  };

  // Toggle sort order
  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === "desc" ? "asc" : "desc"));
  };

  // Sorted leaderboard for rendering
  const sortedLeaderboard = sortLeaderboard(leaderboard);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex w-full justify-between items-center">
        <p className="font-polysansbulky text-xl ml-1">Leaders</p>
        <div className="w-[300px] ml-auto">
          <Input
            placeholder="search"
            onInput={(e: any) => {
              handleSearch(e.target.value);
            }}
          />
        </div>
      </div>
      
      <div className="flex flex-col gap-4 z-20 w-full text-white border text-sm border-border_dark rounded-md">
        <div className="flex flex-col w-full h-full overflow-auto bg-secondary_dark rounded-md font-polysansbulky">
          <div className="grid grid-cols-7 gap-5 text-secondary_text_dark items-center w-full p-4 border-b border-border_dark">
            <p className="w-full truncate">Rank</p>
            <p className="w-full truncate col-span-2">Name</p>
            <p className="w-full truncate col-span-2">Tier</p>
            {/* <p className="w-full truncate col-span-2">Last Month Points</p> */}
            <button
              onClick={toggleSortOrder}
              className="w-full truncate col-span-2 text-left hover:text-white"
            >
              Total Points {sortOrder === "desc" ? "↓" : "↑"}
            </button>
          </div>

          <ScrollArea
            className="flex flex-col gap-2 w-full h-[80vh] overflow-y-auto scrollbar scrollbar-thumb-sky-700 scrollbar-track-sky-300"
            onScroll={onScroll}
          >
            {loading && page === 1 ? (
              <div className="flex p-4">
                <PageLoading />
              </div>
            ) : sortedLeaderboard?.length ? (
              sortedLeaderboard.map((b: any, i) => {
                return (
                  <div
                    className="grid grid-cols-7 gap-8 items-center w-full p-4 text-sm"
                    key={i}
                  >
                    <p className="w-full truncate col-span-1">#{i + 1}</p>
                    <div className="flex items-center gap-2 w-full col-span-2">
                      <img
                        src="/images/png/avatar1.png"
                        className="h-5 w-auto rounded-md"
                        alt=""
                      />
                      <p className="w-full truncate">{b.discordIdentifier}</p>
                    </div>
                    <p className="w-full truncate col-span-2">
                      {b.tier || "--"}
                    </p>
                    <p className="w-full truncate col-span-2">
                      {b.cumulativeLeaderboard}
                    </p>
                  </div>
                );
              })
            ) : (
              <div className="flex p-4">
                <p>No data found</p>
              </div>
            )}
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
