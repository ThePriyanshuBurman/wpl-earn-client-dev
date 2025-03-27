import { ChevronLeft } from "lucide-react";

export default function BackButton({ onClick }: { onClick?: any }) {
  return (
    <button
      onClick={onClick}
      className="flex gap-1 items-center hover:underline text-sm cursor-pointer"
    >
      <ChevronLeft size={"16"} />
      <span className="font-medium">Back</span>
    </button>
  );
}
