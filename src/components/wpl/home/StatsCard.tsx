import { BorderBeam } from "@/components/magicui/border-beam";
import { BriefcaseBusiness, DollarSign } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { api_paths } from "@/lib/urls";


export default function StatsCard() {
  const [tvl, setTvl] = useState<number>(0);
  const [oppurtunities, setOppurtunities] = useState<number>(0);

  const getPlatformAnalytics = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}${api_paths.platform_analytics}`,
    )

    if (res.data) {
      setTvl(res.data.data.totalValueEarned)
      setOppurtunities(res.data.data.opportunitiesListed)
    }
  }

  useEffect(() => {
    getPlatformAnalytics();
  }, [])
  return (
    <div className="flex gap-2 bg-secondary_dark border border-border_dark  backdrop-blur-sm p-4 rounded-lg relative overflow-hidden">
      <div className="flex items-center gap-4">
        <div className="bg-primary_dark text-[#46cfb6] p-2 rounded-md">
          <DollarSign />
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-[13px] font-normal text-secondary_text_dark">
            Total Value Earned
          </p>
          <p className="text-xl font-[550] gradient-text">{tvl ? tvl : 0}</p>
        </div>
      </div>
      <div className="border-r border-dashed border-border_dark w-max h-[7vh] mx-auto"></div>

      <div className="flex items-center gap-4">
        <div className="bg-primary_dark text-[#46cfb6] p-2 rounded-md">
          <BriefcaseBusiness />
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-[13px] font-normal text-secondary_text_dark">
            Opportunities Listed
          </p>
          <p className="text-xl font-[550] gradient-text">{oppurtunities ? oppurtunities : 0}</p>
        </div>
      </div>
      <BorderBeam
        size={40}
        initialOffset={20}
        className="from-transparent via-[#46cfb6] to-transparent"
        transition={{
          type: "spring",
          stiffness: 60,
          damping: 20,
        }}
      />
    </div>
  );
}
