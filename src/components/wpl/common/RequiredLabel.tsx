export default function RequiredLable({ text }: { text: string }) {
  return (
    <p className="flex flex-wrap items-center gap-2 text-sm whitespace-nowrap">
      {text} <span className="text-red-500 h-4">*</span>
    </p>
  );
}
