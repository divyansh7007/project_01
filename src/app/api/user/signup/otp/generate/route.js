import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import OTPModals from "@/schemas/otpSchema";
import { connectToDb } from "@/lib/connectToDb";
import nodemailer from "nodemailer";

connectToDb();

const transporter = await nodemailer.createTransport({
  host: "smtp.zoho.com",
  port: "465",
  secure: true,
  auth: {
    user: "divyanshsahuji7007@gmail.com",
    pass: "divyansh123@@@",
  },
});

transporter.verify((err, sucess) => {
  if (sucess) {
    return console.log("Your email is ready");
  } else {
    return console.log("Error");
  }
});

const sendEmail = async (email, OTP) => {
  let message = {
    from: "divyanshsahuji@zohomail.com",
    to: email,
    html: `
    <div className="flex items-center justify-center w-screen">
    <img className="w-32 rounded-full" src="" alt="Name" />
    <p className="text-center font-bold text-2xl">Your Otp is: ${OTP}</p>
    </div>
    `,
  };

  transporter.sendMail(message);
};

const genOtp = async () => {
  const OTP = (Math.floor(Math.random() * 900000) + 100000).toString();
  return { OTP, OTPSecure: OTP };
};

const requestForValidation = async (NextResponse, findEmail, OTP) => {
  if (findEmail[0].resend_Time <= 3) {
    const otp = OTP;
    const updateOtp = await OTPModals.findByIdAndUpdate(findEmail[0]._id, {
      OTP: otp,
      resend_Time: findEmail[0].resend_Time + 1,
    });
    await sendEmail(findEmail[0].email, OTP);
    return NextResponse.json({ status: true, msg: "Otp generated successfully" });
  } else if (findEmail[0].resend_Time > 3) {
    const setTimeForResend = await OTPModals.findByIdAndUpdate(
      findEmail[0]._id,
      { timeForResend: Date.now() }
    );
    return NextResponse.json({
      status: false, error: "You have reach to your limit. Please try again after some time",
    });
  }
};

export async function POST(request) {
  try {
    const reqBody = await request.json();
    if (reqBody.email === undefined || reqBody.email.length === 0) {
      return NextResponse.json(
        { error: "Please provide Email for OTP", status: false },
        { status: 400 }
      );
    }

    const email = reqBody.email;

    const { OTPSecure, OTP } = await genOtp();
    const findEmail = await OTPModals.find({ email });

    if (findEmail.length === 1) {
      if (findEmail[0].timeForResend === undefined) {
        return await requestForValidation(NextResponse, findEmail, OTP);
      } else if (findEmail[0].timeForResend) {
        const currentTime = Date.now();
        const timeDifference = Math.round(
          (currentTime - findEmail[0].timeForResend) / 1000 / 60
        );
        if (timeDifference >= 10) {
          const updateResendTime = await OTPModals.findByIdAndUpdate(
            findEmail[0]._id,
            { resend_Time: 0 }
          );
          return await requestForValidation(NextResponse, findEmail, OTP);
        } else {
          return NextResponse.json({ error: "Please try after some time!", status: false });
        }
      }
    }

    const createOtpInDb = await OTPModals.create({
      email,
      OTP: OTPSecure,
      created_At: Date.now(),
    });
    return NextResponse.json({ status: true, msg: "Sent successfully!" });
  } catch (error) {
    console.log("Internal Server Error occured");
    console.log(error.message);
    return NextResponse.json(
      { error: "Internal Server Error", status: false },
      { status: 500 }
    );
  }
}
