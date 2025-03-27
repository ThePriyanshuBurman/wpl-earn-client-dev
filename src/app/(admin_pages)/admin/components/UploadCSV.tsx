import { Modal } from "@/components/ui/Modal";
import { PrimaryButton } from "@/components/wpl/components/button";
import { XIcon } from "lucide-react";
import { useRef } from "react";
import { toast } from "sonner";

export default function UploadCSVModal({
  open,
  close,
  selectedFile,
  setDragOver,
  setSelectedFile,
  uploadCSV,
}: {
  open: boolean;
  close: any;
  selectedFile: any;
  setDragOver?: any;
  setSelectedFile: any;
  uploadCSV: (selected_file: File | undefined) => void;
}) {
  const uploaderRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: any) => {
    if (uploaderRef.current?.files) {
      const file = uploaderRef.current.files[0];
      // Handle file upload
      handleFileUploadLocalDrag(file);
    }
  };

  const handleFileUploadLocalDrag = (file: File) => {
    let file_extension = file.name.split(".").pop();
    if (file_extension !== "csv") {
      setDragOver(false);
      toast.error("Please upload CSV file!");
      return;
    }
    setSelectedFile(file);
    setDragOver(true);
  };
  return (
    <Modal open={open} close={close} title="Upload CSV">
      <div
        className="flex items-center justify-center h-[40vh] w-[90vw] md:w-[60vw] lg:w-[30vw] border border-border_dark border-dashed rounded-md p-4"
        onDragOver={(e) => {
          setDragOver(true);
          e.preventDefault();
          e.stopPropagation();
        }}
        onDrag={(e) => {
          setDragOver(true);
          e.preventDefault();
          e.stopPropagation();
        }}
        onDragEnter={(e) => {
          setDragOver(true);
          e.preventDefault();
          e.stopPropagation();
        }}
        onDragLeave={(e) => {
          setDragOver(false);
          e.preventDefault();
          e.stopPropagation();
        }}
        onDrop={(e) => {
          e.preventDefault();
          e.stopPropagation();
          // @ts-ignore
          if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            // @ts-ignore
            const Dragedfile = e.dataTransfer.files[0];
            handleFileUploadLocalDrag(Dragedfile);
          } else alert("Please select a file");
          // @ts-ignore
          e.dataTransfer.clearData();
        }}
      >
        <div className="flex flex-col gap-4 mx-auto text-center">
          <img src="/images/png/csv.png" alt="CSV" className="h-24 sm:h-32 mx-auto" />
  
          {selectedFile ? (
            <div className="flex flex-col gap-4 items-center">
              <div className="flex items-center gap-2">
                <p className="text-sm sm:text-base">{selectedFile.name}</p>
                <button
                  className="p-1 bg-gray-200 hover:bg-gray-300 rounded-full"
                  onClick={() => {
                    setDragOver(false);
                    setSelectedFile(undefined);
                  }}
                >
                  <XIcon size="14" />
                </button>
              </div>
              <div className="w-[150px] sm:w-[200px]">
                <PrimaryButton onClick={() => uploadCSV(selectedFile)}>
                  <p>Upload</p>
                </PrimaryButton>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <p className="text-xs sm:text-sm text-secondary_text_dark">
                Drag your file here, or{" "}
                <input
                  id="csv"
                  type="file"
                  className="hidden"
                  ref={uploaderRef}
                  onChange={handleFileUpload}
                />
                <label
                  htmlFor="csv"
                  className="hover:underline text-sky-500 cursor-pointer ml-1"
                >
                  Choose a file
                </label>
              </p>
              <p className="text-xs text-secondary_text_dark">Only CSV files are allowed.</p>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}  