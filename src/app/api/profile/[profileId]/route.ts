import Profile from "@/models/profile";
import { connectDB } from "@/utils/connectDB";
import { NextResponse } from "next/server";

export async function GET(req: any, context: any) {
  try {
    await connectDB()
    const profileId = context.params.profileId

    const profile = await Profile.findOne({_id: profileId})
    if(!profile) return NextResponse.json({ error: 'THere is no profile with this id' }, { status: 404})

    return NextResponse.json({ data: profile }, {status: 200})

  } catch (error) {
    return NextResponse.json({ error: 'Some problem in server'}, { status: 500 })
  }
}