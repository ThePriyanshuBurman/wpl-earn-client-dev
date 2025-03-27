import Link from "next/link";
import { Modal } from "../../ui/Modal";
import { PrimaryButton, SecondaryButton } from "../components/button";
import { api_paths, paths } from "@/lib/urls";
import Input, { OTPInput, PasswordInput } from "../components/input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { useUserStore } from "@/app/store";

export default function SignUpModal({
  open,
  close,
  type,
}: {
  open: boolean;
  type?: any;
  close: () => void;
}) {
  const router = useRouter();
  const handleUserLogin = async () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}${api_paths.login}?type=${type}`;
  };

  const updateUserDetails = useUserStore(
    (state: any) => state.updateUserDetails
  );

  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [otp, setOTP] = useState<any>(null);
  const [showEnterPassword, setShowEnterPassword] = useState(false);
  const [showEnterNewPassword, setShowEnterNewPassword] = useState(false);

  const [forgotPassword, setForgotPassword] = useState(false);

  const handleEmailSignUp = async () => {
    if (!email || !password) {
      toast.error("Please enter all fields!!");
      return;
    }
    try {
      setLoading(true);

      //   const login_res = await axios.post(
      //     `${process.env.NEXT_PUBLIC_API_URL}${api_paths.login_v_1}`,
      //     {
      //       email: email,
      //       password: password,
      //     }
      //   );

      //   if (login_res.status === 200) {
      //     localStorage.setItem("token", login_res?.data?.token);
      //     updateUserDetails(login_res?.data?.user);
      //     localStorage.setItem(
      //       "userDetails",
      //       JSON.stringify(login_res?.data?.user)
      //     );
      //     toast.success("login successfull");
      //     close();
      //   } else {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}${api_paths.email_signup}`,
        {
          email: email,
          password: password,
        }
      );

      if (res) {
        toast.success(`OTP sent successfully on ${email}`);
        setShowEnterPassword(true);
      }
      //   }
    } catch (error: any) {
      toast.error(
          "Something went wrong! Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };
  const handleValidateOTP = async () => {
    try {
      if (!email || !otp) {
        toast.error("Please enter all fields!!");
        return;
      }
      setLoading(true);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}${api_paths.verify_email}`,
        {
          email: email,
          otp: otp,
        }
      );

      if (res.status === 200) {
        localStorage.setItem("token", res?.data?.token);
        toast.success(`OTP verified successfully`);
        router.push(paths.onboarding);
      }
    } catch (error: any) {
      toast.error(
          "Something went wrong! Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email || !password) {
      toast.error("Please enter email!!");
      return;
    }
    try {
      setLoading(true);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}${api_paths.forgot_password}`,
        {
          email: email,
        }
      );

      if (res.status === 200) {
        toast.success(`OTP sent successfully on ${email}`);
        setShowEnterNewPassword(true);
      }
    } catch (error: any) {
      toast.error(
          "Something went wrong! Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!email || !newPassword || !otp) {
      toast.error("Please enter all fields!!");
      return;
    }
    try {
      setLoading(true);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}${api_paths.reset_password}`,
        {
          email: email,
          newPassword: newPassword,
          otp: otp,
        }
      );

      if (res.status === 200) {
        toast.success(`Password Reset successfully`);
        setForgotPassword(false);
        setShowEnterNewPassword(false);
        setShowEnterPassword(false);
        setEmail("");
        setpassword("");
        setNewPassword("");
        setOTP("");
      }
    } catch (error: any) {
      toast.error(
          "Something went wrong! Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} close={close}>
      <div className="flex flex-col gap-6 items-center w-[350px]">
        <img src="/images/svg/wpl-logo-light.svg" alt="" />
        <div className="flex flex-col gap-1 text-center">
          <p className="text-xl font-polysansbulky gradient-text">
            Start contributing Onchain
          </p>
          <p className="text-sm text-secondary_text_dark">
            Earn in crypto by contributing to your fav projects
          </p>
        </div>

        {forgotPassword && !showEnterNewPassword ? (
          <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-col gap-2 w-full">
              <p className="text-sm text-secondary_text_dark px-2">
                Enter your email
              </p>
              <Input
                placeholder="john@gmail.com"
                value={email}
                onInput={(e: any) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <PrimaryButton onClick={handleForgotPassword} loading={loading}>
              <p>Send OTP</p>
            </PrimaryButton>
          </div>
        ) : forgotPassword && showEnterNewPassword ? (
          <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-col gap-2 w-full">
              <p className="text-sm text-secondary_text_dark px-2">
                Enter OTP sent to your email
              </p>
              <OTPInput
                value={otp}
                onInput={(e: any) => {
                  setOTP(e.target.value);
                }}
              />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <p className="text-sm text-secondary_text_dark px-2">
                enter new password
              </p>
              <PasswordInput
                placeholder=""
                value={newPassword}
                onInput={(e: any) => {
                  setNewPassword(e.target.value);
                }}
              />
            </div>
            <PrimaryButton loading={loading} onClick={handleResetPassword}>
              <p>Reset Password</p>
            </PrimaryButton>
          </div>
        ) : (
          <>
            {!email ? (
              <>
                <SecondaryButton onClick={handleUserLogin}>
                  <div className="mx-auto flex items-center gap-4">
                    <img
                      src="/images/svg/google.svg"
                      alt=""
                      className="h-4 w-auto"
                    />
                    <p>Continue with Google</p>
                  </div>
                </SecondaryButton>

                <div className="flex items-center gap-4 w-[80%] text-xs">
                  <div className="w-full border-b-[0.2px] border-secondary_text_dark" />{" "}
                  OR{" "}
                  <div className="w-full border-b-[0.2px] border-secondary_text_dark" />
                </div>
              </>
            ) : (
              ""
            )}

            {email && showEnterPassword ? (
              <>
                <div className="flex flex-col gap-4 w-full">
                  <div className="flex flex-col gap-2 w-full">
                    <p className="text-sm text-secondary_text_dark px-2">
                      Enter OTP sent to your email
                    </p>
                    <OTPInput
                      value={otp}
                      onInput={(e: any) => {
                        setOTP(e.target.value);
                      }}
                    />
                  </div>
                  <PrimaryButton onClick={handleValidateOTP} loading={loading}>
                    <p>Validate OTP</p>
                  </PrimaryButton>
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-col gap-2 w-full">
                  <p className="text-sm text-secondary_text_dark px-2">
                    Continue with Email
                  </p>
                  <Input
                    placeholder="john@gmail.com"
                    value={email}
                    onInput={(e: any) => {
                      setEmail(e.target.value);
                    }}
                  />
                </div>
                {email ? (
                  <>
                    <div className="flex flex-col gap-2 w-full">
                      <p className="text-sm text-secondary_text_dark px-2">
                        enter password
                      </p>
                      <PasswordInput
                        placeholder=""
                        value={password}
                        onInput={(e: any) => {
                          setpassword(e.target.value);
                        }}
                      />
                    </div>
                    <PrimaryButton
                      loading={loading}
                      onClick={handleEmailSignUp}
                    >
                      <p>Sign Up</p>
                    </PrimaryButton>
                  </>
                ) : (
                  ""
                )}
              </>
            )}
          </>
        )}

        <div className="flex">
          {forgotPassword ? (
            <button
              onClick={() => {
                setForgotPassword(false);
                setShowEnterNewPassword(false);
                setShowEnterPassword(false);
                setEmail("");
                setpassword("");
                setNewPassword("");
                setOTP("");
              }}
              className="text-sm hover:underline"
            >
              Back to login
            </button>
          ) : (
            ""
            // <button
            //   onClick={() => setForgotPassword(true)}
            //   className="text-sm hover:underline"
            // >
            //   Forgot password?
            // </button>
          )}
        </div>

        <p className="text-center text-sm text-secondary_text_dark">
          By using this website, you agree to our{" "}
          <Link href={"/terms"} className="hover:underline text-white">
            Terms of Use{" "}
          </Link>
          and our{" "}
          <Link href={"/terms"} className="hover:underline text-white">
            Privacy Policy
          </Link>
        </p>
        <p className="text-sm text-secondary_text_dark">
          Need help? Reach out to us at{" "}
          <span className="underline hover:text-white cursor-pointer">
            support@wpl.com
          </span>
        </p>
      </div>
    </Modal>
  );
}
