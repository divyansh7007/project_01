"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ButtonLoading } from "@/components/ui/loadingButton";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from 'next/navigation'
import axios from "axios";

const Form = () => {
  const [email, setEmail] = useState("");
  const [OTP, setOTP] = useState(0);
  const [otpVerification, setOtpVerification] = useState(false);
  const [otpLoader, setOtpLoader] = useState(false);
  const [otpVerifyLoader, setOtpVerifyLoader] = useState(false);
  const { toast } = useToast();

  const router = useRouter();

  const sendOtp = async (email) => {
    setOtpLoader(true);
    if (email.length === 0 || email.length < 8) {
      setOtpLoader(false);
      return toast({
        variant: "destructive",
        title: "Invalid!",
        description: "Please Enter a valid E-mail!",
      });
    }
    const reqeust = await axios
      .post("/api/user/signup/otp/generate", {
        email,
      })
      .then((r) => r.data)
      .catch((e) => console.log(e));

      setOtpLoader(false)

      if (reqeust?.status) {
        setOtpLoader(false)
        setOtpVerification(true)
        return toast({
          description: reqeust.msg,
        })
      }else {
        setOtpLoader(false)
        return toast({
          description: toast.error
        })
      }
  };

  const verifyOtp = async (email, OTP) => {
    setOtpVerification(true);
    if ( OTP.length ===  6) {
      const request = await axios.post("/api/user/signup/otp/verify", {
        email, OTP: `${OTP}`
      }).then((r) => r.data)
      .catch((e) => console.log(e));


      if (request.success) {
        toast({
          description: "Your Otp is verified!"
        })

        return router.push(`/user/signup/creation?email=${email}`)

      }else {
        return toast({
          variant: "destructive",
          body: request.error
        })
      }
    }else {
      toast({
        variant: "destructive",
        description: "Please Enter the valid OTP send on your Email!"
      })
    }
  }

  return (
    <>
      <div>
        <Label htmlFor="email">Email</Label>
        <div className="flex items-center justify-center space-x-2">
          <Input
            autoComplete="email"
            className="appearance-none rounded-none relative block w-full px-3 py-2 border rounded-t-md border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            id="email"
            name="email"
            placeholder="email"
            required
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          {otpLoader ? (
            <ButtonLoading />
          ) : (
            <Button onClick={() => sendOtp(email)}>Send OTP</Button>
          )}
        </div>
      </div>
      <div>
        <Label htmlFor="otp">OTP</Label>
        <div className="flex items-center justify-center space-x-2">
          <Input
            disabled={!otpVerification}
            autoComplete="otp"
            className="appearance-none rounded-none relative block w-full px-3 py-2 border rounded-t-md border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            id="otp"
            name="otp"
            placeholder="otp"
            required
            type="number"
            value={ OTP }
            onChange={(e) => setOTP(e.target.value)}
          />
          {otpVerifyLoader ? (
            <ButtonLoading />
          ) : (
            <Button disabled={!otpVerification} onClick={() => verifyOtp(email, OTP)} className={`${!otpVerification && "cursor-not-allowed"}`}>
              Verify OTP
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default Form;
