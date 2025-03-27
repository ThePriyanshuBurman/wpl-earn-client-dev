import { useUserStore } from "@/app/store";
import { PrimaryButton } from "@/components/wpl/components/button";
import { OTPInput } from "@/components/wpl/components/input";
import { encryptString } from "@/lib/token";
import { api_paths } from "@/lib/urls";
import axios from "axios";
import { X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function ConnectToCopperX({
  isCopperxCredsExists,
}: {
  isCopperxCredsExists: any;
}) {
  const [otp, setOTP] = useState<any>(null);
  const [isOTPSent, setIsOTPSent] = useState<boolean>(false);
  const [sid, setSID] = useState<string>("");
  const userDetails = useUserStore((state) => state.userDetails);
  const [loading, setLoading] = useState<boolean>(false);

  const getCopperxOTP = async () => {
    try {
      setLoading(true);
      console.log("userDetails", userDetails?.email);
      const res = await axios.post(
        "https://income-api.copperx.io/api/auth/email-otp/request",
        {
          email: userDetails?.email,
        }
      );

      if (res.status === 200) {
        setIsOTPSent(true);
        setSID(res?.data?.sid);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const setCopperxCred = async () => {
    try {
      if (!otp) {
        toast.error("Please enter OTP!");
        return;
      }
      setLoading(true);
      let token = localStorage.getItem("token");
     
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}${api_paths.post_creds}`,
        {
          // payload: encryptString(JSON.stringify(payload)),
          id: userDetails?.id,
          sid: sid,
          otp: encryptString(otp),
          tokenName: userDetails?.firstName || userDetails?.sponsor?.userName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res?.status === 200) {
        toast.success("Successfully connected to CopperX wallet.");
        isCopperxCredsExists();
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full flex items-center absolute top-0 left-0 bg-black/10 backdrop-filter backdrop-blur-sm z-30">
      <div className="flex flex-col items-center gap-8 mx-auto border border-border_dark p-6 rounded-md bg-primary_dark w-[80%] sm:w-[26vw] h-max relative">
        {isOTPSent ? (
          <button
            onClick={() => {
              setOTP(null);
              setIsOTPSent(false);
            }}
            className="absolute top-4 right-4"
          >
            <X size={"14"} />
          </button>
        ) : (
          ""
        )}
        <img src="/images/png/wallet.png" alt="" className="h-auto w-[80px]" />
        <div className="flex flex-col items-center gap-1">
          <p className="font-polysansbulky gradient-text text-xl">
            Connect To CopperX Account
          </p>
          {isOTPSent ? (
            <p className="text-sm text-secondary_text_dark text-center">
              A one-time password (OTP) has been sent to
              <span className="text-white ml-1">{userDetails?.email}</span>.
              Please enter the code below to verify and complete the connection
              to Copperx.
            </p>
          ) : (
            <p className="text-sm text-secondary_text_dark text-center">
              To proceed, please connect your account to Copperx. This quick
              setup ensures a seamless experience.
            </p>
          )}
        </div>
        {isOTPSent ? (
          <OTPInput
            value={otp || ""}
            onInput={(e: any) => {
              setOTP(e.target.value);
            }}
          />
        ) : (
          <button
            onClick={getCopperxOTP}
            className="flex items-center gap-2 bg-gradient-to-br from-blue-500 to-violet-400 py-2 px-3 rounded-lg hover:bg-gradient-to-bl hover:from-blue-600 hover:to-violet-500 duration-300 w-full"
          >
            {loading ? (
              <p className="mx-auto text-sm">loading...</p>
            ) : (
              <div className="mx-auto flex items-center gap-2">
                <span className="text-sm font-semibold"> Connect to</span>
                <svg
                  height="18"
                  viewBox="0 0 237 53"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="max-w-full"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M26.7615 44.458C16.742 44.458 8.61516 36.4155 8.61516 26.5C8.61516 17.2042 15.7579 9.55462 24.9065 8.63473C25.5164 8.5734 26.1352 8.54199 26.7615 8.54199C33.6289 8.54199 39.6441 12.4221 42.6813 18.0788C43.1152 18.8869 43.4883 19.7313 43.7945 20.6058H51.0864C48.4145 9.75388 38.5064 1.65625 26.7615 1.65625C12.9012 1.65625 1.65723 12.8387 1.65723 26.5C1.65723 39.3075 11.5397 49.9362 24.1954 51.2148C25.0391 51.3001 25.8952 51.3437 26.7615 51.3437C37.0383 51.3437 45.9088 45.144 49.7558 36.3241C50.3054 35.0641 50.7524 33.7507 51.0864 32.3942H43.8501C41.4009 39.3901 34.6657 44.458 26.7615 44.458ZM23.0349 21.5312H30.0039C30.8266 21.5312 31.4938 22.201 31.4941 23.0272L31.497 29.9728C31.4974 30.799 30.8307 31.4688 30.0081 31.4688H23.039C22.2164 31.4688 21.5492 30.799 21.5489 29.9728L21.546 23.0272C21.5456 22.201 22.2122 21.5312 23.0349 21.5312Z"
                    fill="white"
                    className="transition-all"
                  ></path>
                  <path
                    d="M75.4807 42.5294C70.9456 42.5294 67.1757 41.0281 64.1711 38.0256C61.1666 35.023 59.6643 31.3264 59.6643 26.9359C59.6643 22.5453 61.1666 18.8487 64.1711 15.8461C67.1757 12.8436 70.9456 11.3423 75.4807 11.3423C78.9105 11.3423 81.9859 12.3479 84.707 14.359C87.4564 16.3419 89.2563 18.9337 90.1067 22.1346H83.4315C82.8362 20.6616 81.7875 19.4861 80.2852 18.608C78.8113 17.7298 77.2098 17.2908 75.4807 17.2908C72.6463 17.2908 70.3361 18.2114 68.5504 20.0526C66.7647 21.8938 65.8718 24.1882 65.8718 26.9359C65.8718 29.6835 66.7647 31.9779 68.5504 33.8191C70.3361 35.6603 72.6463 36.5809 75.4807 36.5809C77.2098 36.5809 78.8113 36.1419 80.2852 35.2638C81.7875 34.3856 82.8362 33.2101 83.4315 31.7371H90.1067C89.2563 34.938 87.4564 37.544 84.707 39.5552C81.9859 41.538 78.9105 42.5294 75.4807 42.5294Z"
                    fill="white"
                    className="transition-all"
                  ></path>
                  <path
                    d="M111.717 39.3002C109.535 41.4247 106.898 42.4869 103.809 42.4869C100.719 42.4869 98.0832 41.4247 95.9007 39.3002C93.7181 37.1474 92.6268 34.5131 92.6268 31.3972C92.6268 28.3097 93.7181 25.6895 95.9007 23.5367C98.0832 21.3839 100.719 20.3075 103.809 20.3075C106.898 20.3075 109.535 21.3839 111.717 23.5367C113.9 25.6895 114.991 28.3097 114.991 31.3972C114.991 34.5131 113.9 37.1474 111.717 39.3002ZM103.809 37.0483C105.311 37.0483 106.558 36.5243 107.55 35.4762C108.571 34.3998 109.081 33.0401 109.081 31.3972C109.081 29.7543 108.571 28.4088 107.55 27.3607C106.558 26.2843 105.311 25.7462 103.809 25.7462C102.278 25.7462 101.003 26.2843 99.9823 27.3607C98.9903 28.4088 98.4942 29.7543 98.4942 31.3972C98.4942 33.0401 98.9903 34.3998 99.9823 35.4762C101.003 36.5243 102.278 37.0483 103.809 37.0483Z"
                    fill="white"
                    className="transition-all"
                  ></path>
                </svg>
              </div>
            )}
          </button>
        )}
  
        {isOTPSent ? (
          <>
            <PrimaryButton onClick={setCopperxCred} loading={loading}>
              <p>Verify</p>
            </PrimaryButton>
            <button
              onClick={() => {
                setOTP(null);
                getCopperxOTP();
              }}
              className="w-max text-sm mx-auto hover:underline text-secondary_text_dark"
            >
              Resend OTP
            </button>
          </>
        ) : (
          <p className="text-sm text-center text-secondary_text_dark">
            Note: This connection is secure and does not grant permission to
            make any changes. All actions will require OTP verification.
          </p>
        )}
      </div>
    </div>
  );
}  