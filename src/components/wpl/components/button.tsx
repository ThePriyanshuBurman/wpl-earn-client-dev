import { cn } from "@/lib/utils";
import { LoaderCircle } from "lucide-react";

interface ButtonProps {
  onClick?: () => void;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function SecondaryButton({
  onClick,
  loading,
  disabled,
  className,
  children,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={
        className ||
        "flex items-center text-nowrap text-center gap-3 bg-secondary_dark text-primary_text_dark border-2 border-border_dark duration-200 text-sm sm:text-base md:text-lg w-full py-2.5 sm:py-3 md:py-4 px-4 sm:px-6 md:px-8 rounded-lg disabled:cursor-not-allowed hover:shadow hover:shadow-green-500"
      }
    >
      <div className="flex items-center gap-2 mx-auto">
        {loading && (
          <div className="flex animate-spin">
            <LoaderCircle size={"14"} />
          </div>
        )}
        {children}
      </div>
    </button>
  );
}
export function AlertButton({
  onClick,
  loading,
  disabled,
  className,
  children,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={
        className ||
        "flex items-center text-nowrap text-center gap-3 bg-red-500/10 text-primary_text_dark border border-red-500 duration-200 text-sm w-full py-2.5 px-4 rounded-lg disabled:cursor-not-allowed hover:shadow hover:shadow-red-500"
      }
    >
      <div className="flex items-center gap-2 mx-auto">
        {loading && (
          <div className="flex animate-spin">
            <LoaderCircle size={"14"} />
          </div>
        )}
        {children}
      </div>
    </button>
  );
}

export function PrimaryOutlineButton({
  onClick,
  loading,
  disabled,
  className,
  children,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={
        className ||
        "flex items-center text-center gap-3 bg-secondary_dark text-primary_text_dark border border-green-500 duration-200 text-sm w-full py-2.5 px-4 rounded-lg disabled:cursor-not-allowed"
      }
    >
      <div className="flex items-center gap-2 mx-auto">
        {loading && (
          <div className="flex animate-spin">
            <LoaderCircle size={"14"} />
          </div>
        )}
        {children}
      </div>
    </button>
  );
}

export function PrimaryButton({
  onClick,
  loading,
  disabled,
  className,
  children,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={cn(
        "flex items-center text-nowrap text-center gap-3 font-medium border-2 border-primary_dark hover:border-border_dark duration-200 text-sm sm:text-base md:text-lg w-full py-2.5 sm:py-3 md:py-4 px-4 sm:px-6 md:px-8 text-black rounded-xl disabled:cursor-not-allowed bg-gradient-to-br from-[#4CD2B2] to-[#9EE47A] hover:from-[#9EE47A] hover:to-[#4CD2B2] hover:drop-shadow-md hover:shadow hover:shadow-green-500",
        className
      )}
    >
      <div className="flex items-center gap-2 mx-auto">
        {loading && (
          <div className="flex animate-spin">
            <LoaderCircle size={"14"} />
          </div>
        )}
        <div className="flex items-center gap-2 mx-auto">{children}</div>
      </div>
    </button>
  );

}
