import { ButtonHTMLAttributes, ReactNode } from "react";
import Spinner from "../Spinner";

interface SecondaryModalButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  loading?: boolean;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
  variant?: "default" | "subtle" | "highlight";
}

export const SecondaryModalButton = ({
  children,
  loading = false,
  icon = null,
  iconPosition = "left",
  fullWidth = false,
  variant = "default",
  className = "",
  ...props
}: SecondaryModalButtonProps) => {
  const baseStyles = "rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 border-2";
  
  const variantStyles = {
    default: "bg-secondary_dark text-primary_text_dark border-border_dark hover:border-primary_dark/60 hover:shadow hover:shadow-primary_dark/20",
    subtle: "bg-secondary_dark/70 text-secondary_text_dark border-border_dark hover:text-white hover:border-border_dark/90",
    highlight: "bg-secondary_dark text-primary_text_dark border-primary_dark/40 hover:border-primary_dark hover:shadow hover:shadow-primary_dark/30",
  };
  
  const widthStyle = fullWidth ? "w-full" : "";
  const disabledStyle = props.disabled || loading ? "opacity-70 cursor-not-allowed" : "cursor-pointer";

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} text-sm px-4 py-2.5 ${widthStyle} ${disabledStyle} ${className}`}
      disabled={props.disabled || loading}
      {...props}
    >
      {loading ? (
        <div className="flex items-center gap-2">
          <Spinner size="sm" color="white" />
          {children}
        </div>
      ) : (
        <>
          {icon && iconPosition === "left" && <span>{icon}</span>}
          {children}
          {icon && iconPosition === "right" && <span>{icon}</span>}
        </>
      )}
    </button>
  );
};

// export default SecondaryModalButton; 