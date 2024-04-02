import User from "@/models/user";
import { comparePassword, generateAccessToken } from "@/utils/auth";
import { connectDB } from "@/utils/connectDB";
import { NextResponse, type NextRequest } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    await connectDB()
    const { email, password } = await req.json()
    if(!email || !password) {
      return NextResponse.json({ status: 422, message: 'Please enter valid data' })
    }
    const existedUser = await User.findOne({email})
    if(!existedUser) {
      return NextResponse.json({status: 404, message: 'There is no user with these specifications'})
    }
    const isValidPassword = await comparePassword(password, existedUser.password)
    if(!isValidPassword) {
      return NextResponse.json({status: 422, message: 'Email or password is wrong'})
    }
    const tokenFromCookie = req.cookies.get("token")
    const token = await generateAccessToken(email) as string
    cookies().set("token", token)
    return NextResponse.json({
      status: 200, 
      message: 'You logged-in successfully'
    })
  } catch (error) {
    return NextResponse.json({status: 500, message: error})
  }
}