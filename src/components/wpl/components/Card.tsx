export default function Card({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`flex gap-4 bg-secondary_dark border border-border_dark  backdrop-blur-sm p-4 rounded-lg relative overflow-hidden ${
        className ?? ""
      }`}
    >
      {children}
    </div>
  );
}
