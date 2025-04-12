import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface BountyRewardDisplayProps {
  rewardMap: any[];
  denomination: string;
  initialVisibleCount?: number;
}

export default function BountyRewardDisplay({ 
  rewardMap, 
  denomination,
  initialVisibleCount = 3 
}: BountyRewardDisplayProps) {
  const [showAll, setShowAll] = useState(false);

  // Validate and normalize rewardMap
  if (!rewardMap || !Array.isArray(rewardMap) || rewardMap.length === 0) {
    return (
      <div className="flex items-center gap-2 text-secondary_text_dark text-sm">
        No reward information available
      </div>
    );
  }

  // Check if all rewards are the same value
  const firstReward = typeof rewardMap[0] === 'object' && rewardMap[0]?.reward 
    ? parseFloat(rewardMap[0].reward) 
    : parseFloat(rewardMap[0]);

  const allSameValue = rewardMap.every(reward => {
    const rewardValue = typeof reward === 'object' && reward?.reward 
      ? parseFloat(reward.reward) 
      : parseFloat(reward);
    return rewardValue === firstReward;
  });

  // Helper function to get position suffix
  const getOrdinalSuffix = (pos: number) => {
    const j = pos % 10;
    const k = pos % 100;
    if (j === 1 && k !== 11) return pos + "st";
    if (j === 2 && k !== 12) return pos + "nd";
    if (j === 3 && k !== 13) return pos + "rd";
    return pos + "th";
  };

  // For different reward values, show the list with view more option
  const visibleRewards = showAll ? rewardMap : rewardMap.slice(0, initialVisibleCount);
  const hiddenCount = rewardMap.length - initialVisibleCount;
  
  // Calculate total of hidden rewards
  const totalHiddenReward = hiddenCount > 0
    ? rewardMap.slice(initialVisibleCount).reduce((total, reward) => {
        const rewardValue = typeof reward === 'object' && reward?.reward 
          ? parseFloat(reward.reward) 
          : parseFloat(reward);
        return total + rewardValue;
      }, 0)
    : 0;

  // If all rewards are the same, create a consolidated version
  if (allSameValue && rewardMap.length > 1) {
    return (
      <div className="flex gap-3 w-full">
        <div className="flex flex-col w-max py-2">
          <div className="flex flex-col items-center">
            <div className="p-1 rounded-full bg-[#46CFB6]/50"></div>
            <div className="border-r-[0.25px] border-[#46CFB6]/30 w-max h-8 mx-auto"></div>
            <div className="p-1 rounded-full bg-[#46CFB6]/50"></div>
          </div>
        </div>
        <div className="flex flex-col justify-center h-[full]">
          <div className="flex items-center gap-3 text-[#f0f0e0]">
            <div className="flex items-center gap-2">
              <img src="/images/png/medal1.png" alt="" className="h-5 w-auto object-contain" />
              <span className="font-medium text-[#46CFB6]">
                {getOrdinalSuffix(1)} to {getOrdinalSuffix(rewardMap.length)}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <img
                src={denomination === "USDC" ? "/images/png/usdc.png" : "/images/png/strk-icon.png"}
                className="h-4 w-4 min-w-4 object-contain"
                alt=""
              />
              <span className="font-polysansbulky text-sm">
                {firstReward}
              </span>
              <span className="text-secondary_text_dark text-xs">
                {denomination}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render normal list with dots and connectors
  return (
    <div className="flex gap-3 w-full">
      <div className="flex flex-col w-max py-2">
        {visibleRewards.map((_, i) => {
          const isLast = i === visibleRewards.length - 1 && !(!showAll && rewardMap.length > initialVisibleCount);

          return (
            <div key={i} className="flex flex-col items-center">
              <div className="p-1 rounded-full bg-[#46CFB6]/50"></div>
              {!isLast && (
                <div className="border-r-[0.25px] border-[#46CFB6]/30 w-max h-8 mx-auto"></div>
              )}
            </div>
          );
        })}
        {!showAll && rewardMap.length > initialVisibleCount && (
          <div className="flex flex-col items-center">
            <div className="p-1 rounded-full bg-[#46CFB6]/50"></div>
          </div>
        )}
      </div>
      <div className="flex flex-col justify-center gap-[16px] w-full">
        {visibleRewards.map((reward, i) => {
          const rewardValue = typeof reward === 'object' && reward?.reward 
            ? parseFloat(reward.reward) 
            : parseFloat(reward);
          
          const positionNumber = i + 1;
          const positionText = typeof reward === 'object' && reward?.position 
            ? reward.position 
            : getOrdinalSuffix(positionNumber);
            
          return (
            <div
              key={i}
              className="flex items-center justify-between h-[24px]"
            >
              <div className="flex items-center gap-2">
                <img
                  src={`/images/png/medal${i < 3 ? i + 1 : 'default'}.png`}
                  alt=""
                  className="h-5 w-auto object-contain"
                />
                <span className={`font-medium ${i < 3 ? 'text-[#46CFB6]' : 'text-[#f0f0e0]'}`}>
                  {positionText}
                </span>
              </div>
              <div className="flex flex-row items-center gap-1.5">
                <img
                  src={denomination === "USDC" ? "/images/png/usdc.png" : "/images/png/strk-icon.png"}
                  className="h-4 w-4 min-w-4 object-contain"
                  alt=""
                />
                <span className="font-polysansbulky text-sm text-[#f0f0e0]">
                  {rewardValue}
                </span>
                <span className="text-secondary_text_dark text-xs">
                  {denomination}
                </span>
              </div>
            </div>
          );
        })}
        
        {rewardMap.length > initialVisibleCount && (
          <>
            {!showAll && (
              <div 
                onClick={() => setShowAll(true)}
                className="flex items-center justify-between text-[#46CFB6] hover:text-[#5eefd5] cursor-pointer h-[24px] transition-colors duration-150"
              >
                <div className="flex items-center gap-1.5">
                  <span className="font-medium">+{hiddenCount} more</span>
                  <ChevronDown size={16} />
                </div>
                <div className="flex items-center gap-1.5 bg-primary_dark/80 rounded-md px-2 py-0.5 border border-border_dark/30">
                  <img
                    src={denomination === "USDC" ? "/images/png/usdc.png" : "/images/png/strk-icon.png"}
                    className="h-3.5 w-3.5 min-w-3.5 object-contain"
                    alt=""
                  />
                  <span className="font-polysansbulky text-xs text-[#f0f0e0]">{totalHiddenReward}</span>
                  <span className="text-secondary_text_dark text-xs">{denomination}</span>
                </div>
              </div>
            )}
            
            {showAll && (
              <div 
                onClick={() => setShowAll(false)}
                className="flex items-center justify-center gap-1.5 text-[#46CFB6] hover:text-[#5eefd5] cursor-pointer mt-2 h-[24px] transition-colors duration-150"
              >
                <span className="font-medium">Show Less</span>
                <ChevronUp size={16} />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
} 