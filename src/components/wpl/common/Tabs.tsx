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
    <div className="flex items-center gap-0 text-sm cursor-pointer">
      {items.map((item, index) => {
        return (
          <button
            onClick={() => {
              onClick(item?.value);
            }}
            className={`py-4 px-6 font-polysansbulky ${
              active === item.value
                ? "border-b border-[#46CFB6]"
                : "hover:brightness-75 transition-all"
            }`}
            key={index}
          >
            {item?.label}
          </button>
        );
      })}
    </div>
  );
}
