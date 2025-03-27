import { ListCardDarkFlip } from "@/components/wpl/home/ListCard";
import { ListFilter } from "lucide-react";

export default function Listings() {
  let bountyList = [
    {
      image_url: "/images/png/bounty/icon1.png",
      protocol: "Wasabi Protocol",
      name: "Write a Passion Piece about your favorite Solana project or community",
      description:
        "PASSION is a Valentines Day themed - 2 category - Content sprint that aims to give participants a chance to share the passion they have for the projects, communities and Ecosystem we all love.",
      price: "1500",
    },
    {
      image_url: "/images/png/bounty/icon2.png",
      protocol: "Starknet",
      name: "Solana Games Highest Cumulative",
      description:
        "Write a fun and exciting Twitter thread recapping the Sanctum Forecast. Bonus points for including infographics and memes.",
      price: "1200",
    },
    {
      image_url: "/images/png/bounty/icon3.png",
      protocol: "BadChain",
      name: "Write a twitter thread on the Sanctum Forecast",
      description:
        "Write a fun and exciting Twitter thread recapping the Sanctum Forecast. Bonus points for including infographics and memes.",
      price: "560",
    },
    {
      image_url: "/images/png/bounty/icon4.png",
      protocol: "Santum",
      name: "ZkAGI Technical Thread/Research + Video",
      description:
        "AI is rapidly transforming our world, but there’s a critical flaw in most AI systems today: a lack of privacy and verifiability.",
      price: "450",
    },
    {
      image_url: "/images/png/bounty/icon5.png",
      protocol: "Catoff",
      name: "BadTeam Roast Bounty",
      description:
        "After the insane response to the Badchain Roast Bounty, we realized something: it’s only fair if we put ourselves in the hot seat too.",
      price: "350",
    },
    {
      image_url: "/images/png/bounty/icon6.png",
      protocol: "Solana",
      name: "Create A Shareable Video About The Vault’s New LST Creator!",
      description:
        "We need your help spreading the word about our new LST Creator product! We’re looking for you to create a video that is informative, visually appealing, and effectively communicates the details of this new product.",
      price: "300",
    },
    {
      image_url: "/images/png/bounty/icon7.png",
      protocol: "Nufi",
      name: "Stablebonds on Solana: The Future of Tokenized Treasuries",
      description:
        "Create an engaging explainer video (minimum 2 minutes) introducing Stablebonds and explaining why they are a game-changer for global finance.",
      price: "230",
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="w-full flex items-center justify-between border-b border-border_dark">
        <div className="flex items-center gap-8 text-sm cursor-pointer">
          <div className="py-4 px-6 border-b border-[#46CFB6]">
            <p>To Review</p>
          </div>
          <p>Completed</p>
        </div>

        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 text-sm bg-[#0c1517] border border-border_dark rounded-lg px-4 py-2">
            Filters
            <ListFilter size={"13"} />
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {bountyList.map((d: any, i) => {
          return <ListCardDarkFlip data={d} key={i} index={i} />;
        })}
      </div>
    </div>
  );
}
