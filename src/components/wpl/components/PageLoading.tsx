import { LoaderCircle } from "lucide-react";

export default function PageLoading() {
  return (
    <div className="flex items-center gap-2">
      <div className="flex animate-spin w-max h-max text-[#46cfb6]">
        <LoaderCircle size={"16"} />
      </div>
      <span>Loading...</span>
    </div>
  );
}
