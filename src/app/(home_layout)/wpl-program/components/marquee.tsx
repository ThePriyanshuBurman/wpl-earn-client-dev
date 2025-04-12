import { Marquee } from "@/components/magicui/marquee";
import { cn } from "@/lib/utils";

const reviews = [
  {
    name: "Puppy",
    userid: "#1",
    // body: "I've never seen anything like this before. It's amazing. I love it.",
    // profileImg: "https://avatar.vercel.sh/jack",
    img: "/wolfs/1.png",
  },
  {
    name: "Redwolf",
    userid: "#2",
    // body: "I've never seen anything like this before. It's amazing. I love it.",
    // profileImg: "https://avatar.vercel.sh/jack",
    img: "/wolfs/2.png",
  },
  {
    name: "Articwolf",
    userid: "#3",
    // body: "I've never seen anything like this before. It's amazing. I love it.",
    // profileImg: "https://avatar.vercel.sh/jack",
    img: "/wolfs/3.png",
  },
  {
    name: "Graywolf",
    userid: "#4",
    // body: "I've never seen anything like this before. It's amazing. I love it.",
    // profileImg: "https://avatar.vercel.sh/jack",
    img: "/wolfs/4.png",
  },
  {
    name: "Celestialwolf",
    userid: "#5",
    // body: "I've never seen anything like this before. It's amazing. I love it.",
    // profileImg: "https://avatar.vercel.sh/jack",
    img: "/wolfs/5.png",
  },
  {
    name: "Firewolf",
    userid: "#6",
    // body: "I've never seen anything like this before. It's amazing. I love it.",
    // profileImg: "https://avatar.vercel.sh/jack",
    img: "/wolfs/6.png",
  },
  {
    name: "Shadowwolf",
    userid: "#7",
    // body: "I've never seen anything like this before. It's amazing. I love it.",
    // profileImg: "https://avatar.vercel.sh/jack",
    img: "/wolfs/7.png",
  },
  {
    name: "Icewolf",
    userid: "#8",
    // body: "I've never seen anything like this before. It's amazing. I love it.",
    // profileImg: "https://avatar.vercel.sh/jack",
    img: "/wolfs/8.png",
  },
  {
    name: "Thunderwolf",
    userid: "#9",
    // body: "I've never seen anything like this before. It's amazing. I love it.",
    // profileImg: "https://avatar.vercel.sh/jack",
    img: "/wolfs/9.png",
  },
  {
    name: "Warg",
    userid: "#10",
    // body: "I've never seen anything like this before. It's amazing. I love it.",
    // profileImg: "https://avatar.vercel.sh/jack",
    img: "/wolfs/10.png",
  },
  {
    name: "Werewolf",
    userid: "#11",
    // body: "I've never seen anything like this before. It's amazing. I love it.",
    // profileImg: "https://avatar.vercel.sh/jack",
    img: "/wolfs/11.png",
  },
  {
    name: "Fenrir",
    userid: "#12",
    // body: "I've never seen anything like this before. It's amazing. I love it.",
    // profileImg: "https://avatar.vercel.sh/jack",
    img: "/wolfs/12.png",
  },
  {
    name: "Direwolf",
    userid: "#13",
    // body: "I've never seen anything like this before. It's amazing. I love it.",
    // profileImg: "https://avatar.vercel.sh/jack",
    img: "/wolfs/13.png",
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
  name,
  userid,
  img,
}: {
  name: string;
  userid: string;
  img: string;
}) => {
  return (
    <div className="group/card relative">
      <div className="relative transition-transform duration-700 ease-out [transform-style:preserve-3d] hover:[transform:rotateY(180deg)] cursor-pointer h-full">
        {/* Front of card */}
        <figure
          className={cn(
            "relative h-full w-64 overflow-hidden rounded-xl border p-4 [backface-visibility:hidden]",
            // light styles
            "border-gray-950/[.1] bg-secondary_dark hover:secondary_dark/[.05]",
            // dark styles
            "dark:border-gray-50/[.1] bg-secondary_dark dark:hover:secondary_dark/[.15]",
            "bg-[url('/wolfs/background.png')] bg-cover bg-center",
          )}
        >
          <div className="flex flex-row items-center gap-2">
            <div className="flex flex-col">
            <p className="text-xl font-medium dark:text-white/40 self-start pt-3">{userid}</p>
              <figcaption className="text-2xl font-medium dark:text-white">
                {name}
              </figcaption>
            </div>
          </div>

          {/* <blockquote className="mt-2 text-sm">{body}</blockquote> */}

          <div className="mt-3 relative">
            <img src={img} alt="wolf" className="rounded-md" />
            <div className="absolute  bg-emerald-500/20 rounded-md"></div>
          </div>

          <div className="absolute bg-emerald-500/10 rounded-xl pointer-events-none"></div>
        </figure>

        {/* Back of card */}
        <div 
          className={cn(
            "absolute inset-0 h-full w-64 rounded-xl border p-4 [transform:rotateY(180deg)] [backface-visibility:hidden]",
            "border-gray-950/[.1] bg-secondary_dark",
            "dark:border-gray-50/[.1] bg-secondary_dark",
            "bg-[url('/wolfs/background.png')] bg-cover bg-center",
          )}
        >
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold dark:text-white">{name}</h2>
            <div className="w-full h-[1px] bg-gray-500"></div>
            <div className="flex flex-col gap-2 text-sm dark:text-white">
              <div className="flex flex-col gap-1 items-start">
                <span className="font-medium text-xl text-[#4FFFDF]">Rank</span>
                <span className="text-sm text-white font-semibold">#11</span>
              </div>
              <div className="flex flex-col gap-1 items-start">
                <span className="font-medium text-xl text-[#4FFFDF]">Points</span>
                <span className="text-sm text-white font-semibold">1,250</span>
              </div>
            </div>
          </div>
          <div className="absolute bg-emerald-500/10 rounded-xl pointer-events-none"></div>
        </div>
      </div>
    </div>
  );
};

export default function MarqueeDemo() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.userid} {...review} />
        ))}
      </Marquee>
      <div className="hidden md:block">
        <Marquee reverse pauseOnHover className="[--duration:20s]">
          {secondRow.map((review) => (
            <ReviewCard key={review.userid} {...review} />
          ))}
        </Marquee>
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
    </div>
  );
}