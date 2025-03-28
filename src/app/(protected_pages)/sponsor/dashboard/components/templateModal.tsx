import { Modal } from "@/components/ui/Modal";
import { SecondaryButton } from "@/components/wpl/components/button";
import { paths } from "@/lib/urls";
import { BookCopy, Eye } from "lucide-react";
import { useRouter } from "next/navigation";

export default function TemplateModal({
  open,
  close,
  setOpenCreateBountyModal,
}: {
  open: boolean;
  close: () => void;
  setOpenCreateBountyModal: any;
}) {
  const router = useRouter();
  let templates = [
    {
      name: "Start from Scratch",
    },
    {
      name: "Frontend Development",
    },
    {
      name: "Twitter Manager",
    },
    {
      name: "Full Stack Development",
    },
    {
      name: "Technical Writing",
    },
    {
      name: "UI/UX Design",
    },
  ];
   
  return (
    <Modal open={open} close={close}>
      <div className="flex flex-col gap-6 w-full h-max p-4 sm:p-6 md:p-8">
        {/* Title Section */}
        <div className="text-center md:text-left">
          <p className="text-lg md:text-xl font-semibold">Start with Templates</p>
          <p className="text-sm text-gray-400">
            Go live in 2 mins by using our existing template
          </p>
        </div>
  
        {/* Template Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {templates.map((t, i) => (
            <div
              key={i}
              className="flex flex-col w-full sm:max-w-[320px] h-max bg-secondary_dark border border-border_dark rounded-md"
            >
              {/* Image Section */}
              <div className="flex items-center h-[120px] bg-green-200/10 rounded-t-md">
                <div className="mx-auto">
                  <img src="/images/png/programming.png" className="h-[50px]" alt="" />
                </div>
              </div>
  
              {/* Content Section */}
              <div className="flex flex-col gap-4 p-4">
                <p className="text-center md:text-left">{t.name}</p>
  
                {/* Buttons Section */}
                <div className="flex flex-col sm:flex-row gap-3 md:gap-4 items-center w-full text-sm">
                  <SecondaryButton className="w-full sm:w-auto">
                    <div className="flex items-center gap-2 mx-auto">
                      <Eye size={14} />
                      Preview
                    </div>
                  </SecondaryButton>
  
                  <SecondaryButton
                    className="w-full sm:w-auto"
                    onClick={() => {
                      setOpenCreateBountyModal(false);
                    }}
                  >
                    <div className="flex items-center gap-2 mx-auto">
                      <BookCopy size={14} />
                      Use
                    </div>
                  </SecondaryButton>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
}  