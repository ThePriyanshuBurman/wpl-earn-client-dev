import { Dialog, DialogContent } from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";

export function Modal({
  children,
  open,
  close,
  title,
}: {
  children: any;
  open: boolean;
  close: () => void;
  title?: string;
}) {
  return (
    <Dialog open={open} onOpenChange={() => close()}>
      <DialogContent className="bg-primary_dark border border-border_dark text-white w-max">
        <DialogTitle>
          <p className="font-polysansbulky gradient-text">{title ?? ""}</p>
        </DialogTitle>
        {children}
      </DialogContent>
    </Dialog>
  );
}
