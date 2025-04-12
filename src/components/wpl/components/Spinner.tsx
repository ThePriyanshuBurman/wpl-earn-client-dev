interface SpinnerProps {
    size?: "xs" | "sm" | "md" | "lg";
    color?: "white" | "primary" | "red" | "green" | "blue" | "yellow";
    className?: string;
  }
  
  const Spinner = ({ size = "md", color = "white", className = "" }: SpinnerProps) => {
    const sizeClasses = {
      xs: "w-3 h-3 border-[1.5px]",
      sm: "w-4 h-4 border-2",
      md: "w-5 h-5 border-2",
      lg: "w-8 h-8 border-[3px]",
    };
  
    const colorClasses = {
      white: "border-t-white",
      primary: "border-t-primary_dark",
      red: "border-t-red-500",
      green: "border-t-green-500",
      blue: "border-t-blue-500",
      yellow: "border-t-yellow-500",
    };
  
    return (
      <div
        className={`border-transparent rounded-full animate-spin ${sizeClasses[size]} ${colorClasses[color]} ${className}`}
      />
    );
  };
  
  export default Spinner; 