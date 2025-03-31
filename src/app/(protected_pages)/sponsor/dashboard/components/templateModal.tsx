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
      <div className="flex flex-col gap-6 w-full h-max p-0 sm:p-6 md:p-8">
        {/* Title Section */}
        <div className="text-center md:text-left">
          <p className="text-lg md:text-xl font-semibold">Start with Templates</p>
          <p className="text-sm text-gray-400">
            Go live in 2 mins by using our existing template
          </p>
        </div>
  
        {/* Template Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          {templates.map((t, i) => (
            <div
              key={i}
              className="flex flex-col w-full max-w-[140px] sm:max-w-[180px] bg-secondary_dark border border-border_dark rounded-lg mx-auto shadow-md"
            >
              {/* Image Section */}
              <div className="flex items-center h-[70px] sm:h-[100px] bg-green-200/10 rounded-t-lg">
                <div className="mx-auto">
                  <img
                    src="/images/png/programming.png"
                    className="h-[30px] sm:h-[40px]"
                    alt=""
                  />
                </div>
              </div>
  
              {/* Content Section */}
              <div className="flex flex-col gap-2 sm:gap-3 p-2 sm:p-3">
                <p className="text-center text-xs sm:text-sm font-medium">{t.name}</p>
  
                {/* Buttons Section */}
                <div className="flex flex-col gap-2 sm:gap-3 items-center w-full text-xs sm:text-sm">
                  <SecondaryButton className="w-full sm:w-auto px-2 py-1 text-xs">
                    <div className="flex items-center gap-1 mx-auto">
                      <Eye size={12} />
                      Preview
                    </div>
                  </SecondaryButton>
  
                  <SecondaryButton
                    className="w-full sm:w-auto px-2 py-1 text-xs"
                    onClick={() => {
                      setOpenCreateBountyModal(false);
                    }}
                  >
                    <div className="flex items-center gap-1 mx-auto">
                      <BookCopy size={12} />
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
// return (
//   <Modal open={open} close={close}>
//     <div className="flex flex-col gap-4 w-[90%] sm:w-[80%] md:w-[60%] h-max p-3 sm:p-6 md:p-8 mx-auto">
//       {/* Title Section */}
//       <div className="text-center md:text-left">
//         <p className="text-base sm:text-lg md:text-xl font-semibold">Start with Templates</p>
//         <p className="text-xs sm:text-sm text-gray-400">
//           Go live in 2 mins by using our existing template
//         </p>
//       </div>

//       {/* Template Grid */}
//       <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 md:gap-6">
//         {templates.map((t, i) => (
//           <div
//             key={i}
//             className="flex flex-col w-full max-w-[120px] sm:max-w-[160px] bg-secondary_dark border border-border_dark rounded-lg mx-auto shadow-md"
//           >
//             {/* Image Section */}
//             <div className="flex items-center h-[60px] sm:h-[90px] bg-green-200/10 rounded-t-lg">
//               <div className="mx-auto">
//                 <img
//                   src="/images/png/programming.png"
//                   className="h-[25px] sm:h-[35px]"
//                   alt=""
//                 />
//               </div>
//             </div>

//             {/* Content Section */}
//             <div className="flex flex-col gap-1.5 sm:gap-3 p-2 sm:p-3">
//               <p className="text-center text-xs sm:text-sm font-medium">{t.name}</p>

//               {/* Buttons Section */}
//               <div className="flex flex-col gap-1.5 sm:gap-3 items-center w-full text-xs sm:text-sm">
//                 <SecondaryButton className="w-full sm:w-auto px-2 py-1 text-[10px]">
//                   <div className="flex items-center gap-1 mx-auto">
//                     <Eye size={10} />
//                     Preview
//                   </div>
//                 </SecondaryButton>

//                 <SecondaryButton
//                   className="w-full sm:w-auto px-2 py-1 text-[10px]"
//                   onClick={() => {
//                     setOpenCreateBountyModal(false);
//                   }}
//                 >
//                   <div className="flex items-center gap-1 mx-auto">
//                     <BookCopy size={10} />
//                     Use
//                   </div>
//                 </SecondaryButton>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   </Modal>
// );
  
}