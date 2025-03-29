export default function Tabs({
  items,
  active,
  onClick,
}: {
  items: any[];
  active: any;
  onClick: any;
}) {
  return (
    <div className="flex items-center gap-0 text-sm cursor-pointer overflow-x-auto">
      {items.map((item, index) => (
        <button
          onClick={() => onClick(item?.value)}
          className={`py-4 px-6 sm:px-4 sm:py-3 font-polysansbulky min-w-[80px] text-xs sm:text-sm ${
            active === item.value
              ? "border-b border-[#46CFB6]"
              : "hover:brightness-75 transition-all"
          }`}
          key={index}
        >
          {item?.label}
        </button>
      ))}
    </div>
  );  
}
