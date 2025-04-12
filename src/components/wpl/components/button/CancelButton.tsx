import { X } from "lucide-react";
import { ButtonHTMLAttributes, ReactNode } from "react";
import Spinner from "../Spinner";

interface CancelButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  loading?: boolean;
  variant?: "default" | "text" | "outline" | "muted";
  size?: "sm" | "md" | "lg";
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
}

const CancelButton = ({
  children,
  loading = false,
  variant = "default",
  size = "md",
  icon = <X className="w-4 h-4" />,
  iconPosition = "left",
  fullWidth = false,
  className = "",
  ...props
}: CancelButtonProps) => {
  const baseStyles = "rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 border-2";
  
  const variantStyles = {
    default: "bg-secondary_dark text-primary_text_dark border-border_dark hover:border-red-500/70 hover:shadow hover:shadow-red-500/30",
    text: "text-red-400 bg-secondary_dark border-transparent hover:bg-red-500/10",
    outline: "border-red-500/70 text-primary_text_dark bg-secondary_dark hover:bg-red-500/10",
    muted: "bg-secondary_dark text-secondary_text_dark border-border_dark hover:text-white hover:border-red-400/50",
  };
  
  const sizeStyles = {
    sm: "text-xs px-3 py-1.5",
    md: "text-sm px-4 py-2.5",
    lg: "text-base px-5 py-3",
  };

  const widthStyle = fullWidth ? "w-full" : "";
  const disabledStyle = props.disabled || loading ? "opacity-70 cursor-not-allowed" : "cursor-pointer";

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyle} ${disabledStyle} ${className}`}
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

export default CancelButton; 