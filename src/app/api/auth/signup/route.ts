import User from "@/models/user";
import { hashPassword } from "@/utils/auth";
import { connectDB } from "@/utils/connectDB";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    email: string;
    password: string;
  };
}

export async function POST(req: any) {
  try {
    await connectDB()
    const { email, password } = await req.json()
    console.log({email, password})
    if(!email || !password) {
      return NextResponse.json({ status: 422, message: 'Please send email and password correctly.' })
    }
    
    const userExist = await User.findOne({email: email})
    console.log({userExist})
    if (!!userExist) {
      return NextResponse.json({ status: 422, message: 'User with this email already exist.'})
    }

    const hashedPassword = await hashPassword(password)
    await User.create({email, password: hashedPassword})
    return NextResponse.json({status: 201, message: 'User is created successfully.'})

  } catch (error) {
    return NextResponse.json({status: 500, message: error})
  }
}