import { api_paths } from "@/lib/urls";
import axios from "axios";
import { Plus, X } from "lucide-react";
import Compressor from "compressorjs";
import { useState } from "react";

export default function ImageInput({ onInput }: { onInput: any }) {
  const [localImageUrl, setLocalImageUrl] = useState("");
  const [loadingImage, setLoadingImage] = useState<boolean>(true);

  const getUrl = async ({ file }: { file: any }) => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Authorization token is missing");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoadingImage(true);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}${api_paths.upload_image}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res) {
        onInput({ url: res?.data?.key });
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setLoadingImage(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      new Compressor(selectedFile, {
        quality: 0.8, // Adjust compression quality (0 to 1)
        success(compressedFile) {
          setLocalImageUrl(URL.createObjectURL(compressedFile));
          getUrl({ file: compressedFile });
        },
        error(err) {
          console.error("Compression error:", err);
        },
      });
    }
  };

  return (
    <>
      {localImageUrl ? (
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <img src={localImageUrl} alt="" className="h-20 w-20" />
            <button onClick={() => setLocalImageUrl("")}>
              <X size={"14"} />
            </button>
          </div>
          <p className="text-sm text-secondary_text_dark">
            {loadingImage ? "Uploading..." : ""}
          </p>
        </div>
      ) : (
        <div className="text-sm px-5 py-4 border border-dashed border-gray-500 rounded-lg w-max">
          <label className="flex items-center gap-2 text-[#46CFB6] hover:underline duration-200 cursor-pointer font-bold">
            <input
              type="file"
              hidden
              id="imageInput"
              onChange={handleImageUpload}
              accept="image/*"
            />
            Upload
            <Plus size={14} />
          </label>
        </div>
      )}
    </>
  );
}
