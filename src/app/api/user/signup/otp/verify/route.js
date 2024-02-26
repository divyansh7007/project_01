import { NextResponse } from "next/server";
import otpModel from "@/schemas/otpSchema";
import { connectToDb } from "@/lib/connectToDb";
import bcrypt from "bcryptjs";
import verifyEmail from '@/schemas/verifyEmailSchema'

connectToDb();

export async function POST(request) {
  try {
    const { email, OTP } = await request.json();
    const FindEmail = await otpModel.findOne({ email });
    if (FindEmail === null) {
      return NextResponse.json(
        { error: "No Such Email is found!", success: false },
        { status: 400 }
      );
    } else {
      if (OTP === FindEmail.OTP) {
        const deleteOtp = await otpModel.findByIdAndDelete(FindEmail._id);
        const markAsVerify = await verifyEmail.create({ email });
        return NextResponse.json({ success: true });
      } else {
        return NextResponse.json({ success: false, error: 'OTP does not match!'  }, { status: 400 });
      }
    }
  } catch (error) {
    console.log("Internal Server Error!");
    console.log(error.message);
    return NextResponse.json({ error: "Internal server Error;" }, { status: 500 })
  }
}
