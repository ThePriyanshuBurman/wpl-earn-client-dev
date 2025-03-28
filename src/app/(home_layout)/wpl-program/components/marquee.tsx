import { Marquee } from "@/components/magicui/marquee";
import { cn } from "@/lib/utils";

const reviews = [
  {
    name: "Jack",
    username: "@jack",
    body: "I've never seen anything like this before. It's amazing. I love it.",
    profileImg: "https://avatar.vercel.sh/jack",
    img: "/wolfs/1.png",
  },
  {
    name: "Jill",
    username: "@jill",
    body: "I don't know what to say. I'm speechless. This is amazing.",
    profileImg: "https://avatar.vercel.sh/jill",
    img: "/wolfs/2.png",
  },
  {
    name: "John",
    username: "@john",
    body: "I'm at a loss for words. This is amazing. I love it.",
    profileImg: "https://avatar.vercel.sh/john",
    img: "/wolfs/3.png",
  },
  {
    name: "Jane",
    username: "@jane",
    body: "I'm at a loss for words. This is amazing. I love it.",
    profileImg: "https://avatar.vercel.sh/jane",
    img: "/wolfs/4.png",
  },
  {
    name: "Jenny",
    username: "@jenny",
    body: "I'm at a loss for words. This is amazing. I love it.",
    profileImg: "https://avatar.vercel.sh/jenny",
    img: "/wolfs/5.png",
  },
  {
    name: "James",
    username: "@james",
    body: "I'm at a loss for words. This is amazing. I love it.",
    profileImg: "https://avatar.vercel.sh/james",
    img: "/wolfs/6.png",
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
  profileImg,
  name,
  username,
  body,
  img,
}: {
  profileImg: string;
  name: string;
  username: string;
  body: string;
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
            "dark:border-gray-50/[.1] bg-secondary_dark dark:hover:secondary_dark/[.15]"
          )}
        >
          <div className="flex flex-row items-center gap-2">
            <div className="flex flex-col">
              <figcaption className="text-sm font-medium dark:text-white">
                {name}
              </figcaption>
              <p className="text-xs font-medium dark:text-white/40">{username}</p>
            </div>
          </div>

          <blockquote className="mt-2 text-sm">{body}</blockquote>

          <div className="mt-3 relative">
            <img src={img} alt="wolf" className="rounded-md" />
            <div className="absolute inset-0 bg-emerald-500/20 rounded-md"></div>
          </div>

          <div className="absolute inset-0 bg-emerald-500/10 rounded-xl pointer-events-none"></div>
        </figure>

        {/* Back of card */}
        <div 
          className={cn(
            "absolute inset-0 h-full w-64 rounded-xl border p-4 [transform:rotateY(180deg)] [backface-visibility:hidden]",
            "border-gray-950/[.1] bg-secondary_dark",
            "dark:border-gray-50/[.1] bg-secondary_dark"
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
          <div className="absolute inset-0 bg-emerald-500/10 rounded-xl pointer-events-none"></div>
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
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <div className="hidden md:block">
        <Marquee reverse pauseOnHover className="[--duration:20s]">
          {secondRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
    </div>
  );
}