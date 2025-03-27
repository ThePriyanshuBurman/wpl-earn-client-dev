import Input from "@/components/wpl/components/input";

const bountySubmissions = [
  {
    uid: 1,
    key: "bounty-1",
    name: "Ajay Mourya",
    whyHire:
      "I have 3+ years of experience in full-stack development, specializing in Web3 and blockchain applications.",
    workLink: "https://github.com/ajaymourya",
    lastProject:
      "Built a decentralized NFT marketplace using Solidity, Next.js, and TheGraph.",
    avatar: "/images/png/avatar2.png",
  },
  {
    uid: 2,
    key: "bounty-2",
    name: "Sophia Carter",
    whyHire:
      "I am a smart contract developer with deep expertise in DeFi and security audits.",
    workLink: "https://portfolio.sophiacarter.dev",
    lastProject:
      "Developed a lending protocol with liquidation bots for Aave ecosystem.",
    avatar: "/images/png/avatar3.png",
  },
  {
    uid: 3,
    key: "bounty-3",
    name: "Rahul Verma",
    whyHire:
      "Experienced in designing scalable Web3 applications and dApps for high-traffic platforms.",
    workLink: "https://rahulverma.dev",
    lastProject:
      "Built a real-time gas fee tracker using Ethereum Layer 2 rollups.",
    avatar: "/images/png/avatar1.png",
  },
  {
    uid: 4,
    key: "bounty-4",
    name: "Emily Zhang",
    whyHire:
      "Specialist in front-end UI/UX for Web3, focusing on user-friendly blockchain interactions.",
    workLink: "https://dribbble.com/emilyzhang",
    lastProject:
      "Designed an interactive staking dashboard for a DeFi project.",
    avatar: "/images/png/avatar2.png",
  },
  {
    uid: 5,
    key: "bounty-5",
    name: "Jake Thompson",
    whyHire:
      "Blockchain developer with experience in cross-chain interoperability solutions.",
    workLink: "https://linkedin.com/in/jakethompson",
    lastProject:
      "Implemented a cross-chain bridge between Ethereum and BSC for asset transfers.",
    avatar: "/images/png/avatar3.png",
  },
  {
    uid: 6,
    key: "bounty-6",
    name: "Liam Wilson",
    whyHire:
      "Backend engineer specializing in GraphQL APIs for Web3 applications.",
    workLink: "https://github.com/liamwilson",
    lastProject:
      "Created a GraphQL API to query on-chain data from multiple blockchains.",
    avatar: "/images/png/avatar1.png",
  },
  // {
  //   uid: 7,
  //   key: "bounty-7",
  //   name: "Nina Patel",
  //   whyHire:
  //     "Full-stack Web3 developer with experience in smart contract integrations.",
  //   workLink: "https://ninapatel.dev",
  //   lastProject: "Developed a token launchpad for new crypto projects.",
  //   avatar: "/images/png/avatar2.png",
  // },
  // {
  //   uid: 8,
  //   key: "bounty-8",
  //   name: "Carlos Rivera",
  //   whyHire:
  //     "Security researcher with expertise in smart contract vulnerabilities and audits.",
  //   workLink: "https://carlosrivera.dev",
  //   lastProject:
  //     "Conducted a security audit for a major DeFi yield farming protocol.",
  //   avatar: "/images/png/avatar3.png",
  // },
  // {
  //   uid: 9,
  //   key: "bounty-9",
  //   name: "Ava Mitchell",
  //   whyHire:
  //     "Passionate about Web3 gaming and NFT ecosystems, building play-to-earn experiences.",
  //   workLink: "https://avamitchell.games",
  //   lastProject:
  //     "Developed an NFT-based strategy game with Polygon integration.",
  //   avatar: "/images/png/avatar1.png",
  // },
  // {
  //   uid: 10,
  //   key: "bounty-10",
  //   name: "Ethan Brown",
  //   whyHire: "Smart contract engineer with experience in Solidity and Rust.",
  //   workLink: "https://github.com/ethanbrown",
  //   lastProject:
  //     "Created a DAO governance contract for a decentralized community.",
  //   avatar: "/images/png/avatar2.png",
  // },
];

export default function ({
  selectedUers,
  setSelectedUsers,
}: {
  selectedUers: any[];
  setSelectedUsers: any;
}) {
  const handleCheckbox = (
    event: React.ChangeEvent<HTMLInputElement>,
    data: any
  ) => {
    const { value, checked } = event.target;

    setSelectedUsers((prev: any) =>
      checked
        ? [...prev, data]
        : prev.filter((item: any) => item.uid !== data.uid)
    );
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex items-center w-full justify-between pl-2">
        <p className="font-polysansbulky text-lg text-white">
          Shortlisted Submissions (6)
        </p>

        <div className="w-[320px]">
          <Input placeholder="search" />
        </div>
      </div>
      <div className="flex flex-col gap-4 z-20 w-full text-white border text-sm border-border_dark rounded-md">
        <div className="flex flex-col w-full h-full overflow-auto bg-secondary_dark rounded-md">
          <div className="grid grid-cols-7 gap-5 text-secondary_text_dark items-center w-full p-4 border-b border-border_dark">
            <p className="w-full truncate"></p>
            <p className="w-full truncate col-span-2">Name</p>
            <p className="w-full truncate col-span-2">Proof Of Work(PoW)</p>
            <p className="w-full truncate col-span-2">Submitted at</p>
            {/* <p className="w-full truncate col-span-2">Share your work</p> */}
          </div>

          <div className="flex flex-col gap-2 w-full">
            {bountySubmissions.map((b, i) => {
              return (
                <div
                  className="grid grid-cols-7  gap-4 items-center w-full p-4 text-sm"
                  key={i}
                >
                  <div className="flex items-center gap-3 w-full">
                    <input
                      type="checkbox"
                      className="bg-transparent"
                      name=""
                      id=""
                      checked={
                        selectedUers.filter((u) => u.uid === b.uid)?.length
                          ? true
                          : false
                      }
                      onChange={(e) => handleCheckbox(e, b)}
                    />
                  </div>
                  <div className="w-full flex items-center col-span-2 gap-2">
                    <img src={b.avatar} alt="" className="h-4 rounded" />
                    <p className="w-full truncate ">{b.name}</p>
                  </div>
                  <p className="w-full truncate col-span-2">{b.workLink}</p>
                  <p className="w-full truncate col-span-2">24th Feb 2025</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
