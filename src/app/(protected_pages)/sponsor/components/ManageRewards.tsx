import { useEffect, useState } from "react";
import Card from "@/components/wpl/components/Card";
import Input from "@/components/wpl/components/input";
import SelectWpl from "@/components/wpl/components/select";
import Tabs from "@/components/wpl/common/Tabs";
import MyActivityTable from "./DeclaredBountyTable";
import ConnectToCopperxModal from "@/app/(admin_pages)/admin/components/ConnectToCopperxModal";
import axios from "axios";
import { api_paths } from "@/lib/urls";
import { useUserStore } from "@/app/store";
import PageLoading from "@/components/wpl/components/PageLoading";
import ConnectToCopperX from "@/app/(admin_pages)/admin/components/ConnectToCopperX";

export default function ManageRewards() {
  const [activeTab, setActiveTab] = useState("activity");
  const [isCopperxAccountExists, setIsCopperxAccountExists] =
    useState<boolean>(true);
  const [loading, setLoading] = useState(true);
  const userDetails = useUserStore((state) => state.userDetails);
  const [copperxWalletBalance, setCopperxWalletBalance] = useState<{[k:string]: any}>({
    USDCWallet: 0.0,
    STRKWallet: 0.0,
    netWorth: 0.0
  });
  const [totalDisbursed, setTotalDisbursed] = useState<any>(0);
  const [bountyTableData, setBountyTableData] = useState<any[]>([]);

  let statusOptions = [
    { label: "All", value: "all" },
    { label: "Pending", value: "pending" },
    { label: "Completed", value: "completed" },
  ];

  let items = [
    {
      label: "My Activity",
      value: "activity",
    },
  ];

  const isCopperxCredsExists = async () => {
    try {
      setLoading(true);
      let token = localStorage.getItem("token");
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}${api_paths.get_creds}?userId=${userDetails?.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res?.status === 200) {
        setIsCopperxAccountExists(res?.data?.data);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const getCopperxWalletBalance = async () => {
    try {
      let token = localStorage.getItem("token");
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}${api_paths.copperx_wallet_balance}?id=${userDetails?.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200) {
        setCopperxWalletBalance(res?.data?.data);
      }
    } catch (error) {
    } finally {
    }
  };
  const getTotalRewards = async () => {
    try {
      let token = localStorage.getItem("token");
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}${api_paths.get_total_rewards}?id=${userDetails?.id}&category=BOUNTY`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200) {
        setTotalDisbursed(res?.data?.totalDisbursed);
        console.log({ res });
      }
    } catch (error) {
    } finally {
    }
  };

  const getClosedListings = async () => {
    try {
      setLoading(true);
      let token = localStorage.getItem("token");
      let url = `${process.env.NEXT_PUBLIC_API_URL}${api_paths.get_sponsor_listing}?id=${userDetails?.sponsor?.id}&type=bounties&state=CLOSED`;
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res) {
        setBountyTableData(res?.data?.data?.bounties);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    isCopperxCredsExists();
    getCopperxWalletBalance();
    getTotalRewards();
    getClosedListings();
  }, []);

  return (
    <>
      <div className="flex w-full h-full overflow-x-auto">
        {loading ? (
          <div className="flex mx-auto">
            <PageLoading />
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-6 pt-4 p-4 sm:p-6 md:p-8 w-full h-full relative">
              {!isCopperxAccountExists ? (
                <ConnectToCopperX isCopperxCredsExists={isCopperxCredsExists} />
              ) : (
                ""
              )}
  
              {/* Manage Rewards Section */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <p className="text-xl sm:text-2xl font-polysansbulky gradient-text py-1.5">
                    Manage Rewards
                  </p>
                </div>
  
                {/* Responsive Grid for Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  <Card className="col-span-1">
                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-normal text-gray-300">
                        Wallet Balance
                      </p>
                      <p className="text-2xl sm:text-3xl font-polysansbulky font-[550] gradient-text">
                        ${copperxWalletBalance.netWorth}
                      </p>
                    </div>
                  </Card>
                  <Card>
                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-normal text-gray-300">
                        Total Rewarded
                      </p>
                      <p className="text-2xl sm:text-3xl font-polysansbulky font-[550] gradient-text">
                        ${totalDisbursed}
                      </p>
                    </div>
                  </Card>
  
                  {/* Keep Commented Parts */}
                  {/* <Card>
                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-normal text-gray-300">
                        {" "}
                        Completed Rewards
                      </p>
                      <p className="text-3xl font-polysansbulky font-[550] gradient-text">
                        $4000
                      </p>
                    </div>
                  </Card>
                  <Card>
                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-normal text-gray-300">
                        Pending Rewards
                      </p>
                      <p className="text-3xl font-polysansbulky font-[550] gradient-text">
                        $1300
                      </p>
                    </div>
                  </Card> */}
                </div>
              </div>
  
              {/* My Listings Section */}
              <div className="flex flex-col">
                {/* <p className="font-polysansbulky">My Listings</p> */}
                <div className="flex flex-wrap items-center justify-between w-full border-b border-border_dark gap-4">
                  <Tabs items={items} active={activeTab} onClick={setActiveTab} />
                  <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                    {/* <div className="w-[180px]">
                      <SelectWpl
                        options={statusOptions}
                        placeholder="Select Status"
                      />
                    </div> */}
                    <div className="w-full sm:w-[280px] md:w-[320px]">
                      <Input placeholder="search" />
                    </div>
                  </div>
                </div>
                <MyActivityTable loading={loading} bountyTableData={bountyTableData} />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}  