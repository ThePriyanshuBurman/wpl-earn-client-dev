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
      <div className="flex flex-col gap-5 w-full h-max">
        <div>
          <p>Start with Templates</p>
          <p className="text-sm text-gray-400">
            Go live in 2 mins by using our existing template
          </p>
        </div>

        <div className="grid grid-cols-3 gap-8">
          {templates.map((t, i) => (
            <div
              className="flex flex-col w-[300px] h-max bg-secondary_dark border border-border_dark rounded-md"
              key={i}
            >
              {/* <img
                src="/images/png/cover.png"
                className="h-[120px] object-cover rounded-t-md"
                alt=""
              /> */}

              <div className="flex items-center h-[120px] bg-green-200/10 rounded-t-md">
                <div className="mx-auto">
                  <img
                    src="/images/png/programming.png"
                    className="h-[50px]"
                    alt=""
                  />
                </div>
              </div>

              <div className="flex flex-col gap-4 p-4">
                <p>{t.name}</p>

                <div className="flex gap-4 items-center w-full text-sm">
                  <SecondaryButton>
                    <div className="flex items-center gap-2 mx-auto">
                      <Eye size={"14"} />
                      Preview
                    </div>
                  </SecondaryButton>

                  <SecondaryButton
                    onClick={() => {
                      setOpenCreateBountyModal(false);
                      // router.push(paths.create_bounty);
                    }}
                  >
                    <div className="flex items-center gap-2 mx-auto">
                      <BookCopy size={"14"} />
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
