import { ProfileData } from "@/app/dashboard/add/page";
import Profile from "@/models/profile";
import User from "@/models/user";
import { hashPassword } from "@/utils/auth";
import { connectDB } from "@/utils/connectDB";
import { Types } from "mongoose";
import { NextApiRequest } from "next";
import { Session, getServerSession } from "next-auth";
import { NextResponse } from "next/server";

interface ExtendedNextApiRequest extends NextApiRequest {
  body: ProfileData
}

export async function POST(req: any) {
  try {
    await connectDB()

    const session : Session | null = await getServerSession(req)
    console.log('session: ', session)
    
    if(!session) return NextResponse.json({ error: 'Please send all necessary data' }, {status: 401})

    const { 
      title, 
      description, 
      location,
      phone,
      price,
      realState,
      category,
      rules,
      amenities,
    } = await req.json()

    console.log({ 
      title, 
      description, 
      location,
      phone,
      price,
      realState,
      category,
      rules,
      amenities,
    })

    if(
      !title ||
      !description || 
      !location ||
      !phone ||
      !price ||
      !realState||
      !category
    ) {
      return NextResponse.json({message: 'Please send all necessary data' }, { status: 422})
    }

    const user = await User.findOne({email: session?.user?.email})

    if(!user) {
      return NextResponse.json({error: 'There is no account with this email' }, { status: 422})
    }

    const newProfile = await Profile.create({
      title,
      description,
      location,
      phone,
      realState,
      price,
      category,
      amenities,
      rules,
      userId: new Types.ObjectId(user._id)
    })

    console.log('newProfile: ', newProfile)
    return NextResponse.json({ message: 'Profile is created successfully' }, { status: 201 })

    // console.log({email, password})
    
    // const userExist = await User.findOne({email: email})
    // console.log({userExist})
    // if (!!userExist) {
    //   return NextResponse.json({ status: 422, message: 'User with this email already exist.'})
    // }

    // const hashedPassword = await hashPassword(password)
    // await User.create({email, password: hashedPassword})
    // return NextResponse.json({status: 201, message: 'User is created successfully.'})

  } catch (error) {
    return NextResponse.json({status: 500, message: error})
  }
}