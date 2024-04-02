import Profile from "@/models/profile"
import User from "@/models/user"
import { connectDB } from "@/utils/connectDB"
import { Session, getServerSession } from "next-auth"
import { NextResponse } from "next/server"

export async function DELETE(req: any, context: any) {
  try {
    await connectDB()

    const session : Session | null = await getServerSession(req)
    if(!session) return NextResponse.json({ error: 'Please send all necessary data' }, {status: 401})

    const id = context.params.profileId

    if( !id ) {
      return NextResponse.json({message: 'Please send all necessary data' }, { status: 422})
    }

    const user = await User.findOne({email: session?.user?.email})

    if(!user) {
      return NextResponse.json({error: 'There is no account with this email' }, { status: 422})
    }
    
    const profile = await Profile.findOne({ _id: id })
    
    if(!user._id.equals(profile.userId)) {
      return NextResponse.json({error: 'You cannot change this profile' }, { status: 403})
    }

    const res = await Profile.deleteOne({ _id: id })

    return NextResponse.json({message: 'profile is deleted successfully'}, {status: 201})
    
  } catch (error) {
    return NextResponse.json({status: 500, message: error})
  }
}