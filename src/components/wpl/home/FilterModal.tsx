import { Modal } from "@/components/ui/Modal";
import { PrimaryButton, SecondaryButton } from "../components/button";

export default function FilterModal({
  open,
  close,
}: {
  open: boolean;
  close: () => void;
}) {
  let filterOptions = [
    {
      label: "All Opportunities",
      value: "all",
    },
    {
      label: "Content",
      value: "all",
    },
    {
      label: "Design",
      value: "all",
    },
    {
      label: "Development",
      value: "all",
    },
    {
      label: "Others",
      value: "all",
    },
  ];
  return (
    <Modal open={open} close={close} title="Filter Bounties">
      <div className="flex flex-col gap-8 w-[25vw] h-full">
        <div className="flex flex-col gap-2">
          {filterOptions.map((f, i) => {
            return (
              <div
                className="flex items-center gap-2 text-sm text-secondary_text_dark"
                key={i}
              >
                <input type="checkbox" name="" id="" />
                <p>{f?.label}</p>
              </div>
            );
          })}
        </div>

        <div className="flex items-center w-full gap-4">
          <SecondaryButton onClick={close}>Close</SecondaryButton>
          <PrimaryButton onClick={close}>Apply</PrimaryButton>
        </div>
      </div>
    </Modal>
  );
}
