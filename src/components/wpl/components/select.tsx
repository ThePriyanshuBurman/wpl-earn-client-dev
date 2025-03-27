import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SelectWpl({
  value,
  options,
  placeholder,
  onSelect,
}: {
  value?: any;
  options: any[];
  placeholder?: string;
  onSelect?: any;
}) {
  return (
    <Select onValueChange={onSelect} value={value}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder ?? "Select"} />
      </SelectTrigger>
      <SelectContent>
        {options.map((o, i) => {
          return (
            <SelectItem key={i} value={o.value}>
              {o.label}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}
