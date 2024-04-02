import Profile from "@/models/profile";
import User from "@/models/user";
import { connectDB } from "@/utils/connectDB";
import { Types } from "mongoose";
import { NextApiRequest } from "next";
import { Session, getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req: any) {
  try {
    await connectDB()
    const profiles = await Profile.find({ certified: true }).select("-userId")
    return NextResponse.json({ data: profiles }, { status: 200 })
  } catch (error) {
    return NextResponse.json({error: 'There is some problem in server'}, {status: 500})
  }
}

export async function POST(req: any) {
  try {
    await connectDB()

    const session : Session | null = await getServerSession(req)
    
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

    return NextResponse.json({ message: 'Profile is created successfully' }, { status: 201 })

  } catch (error) {
    return NextResponse.json({status: 500, message: error})
  }
}

export async function PATCH(req: any) {
  try {
    await connectDB()

    const session : Session | null = await getServerSession(req)
    
    if(!session) return NextResponse.json({ error: 'Please send all necessary data' }, {status: 401})

    const {
      _id, 
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

    if(
      !_id ||
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
    
    const profile = await Profile.findOne({ _id })
    
    if(!user._id.equals(profile.userId)) {
      return NextResponse.json({error: 'You cannot change this profile' }, { status: 403})
    }

    profile.title = title
    profile.description = description
    profile.location = location
    profile.phone = phone
    profile.price = price
    profile.realState = realState
    profile.category = category
    profile.rules = rules
    profile.amenities = amenities

    profile.save()

    return NextResponse.json({message: 'You updated profile successfully'}, {status: 201})

  } catch (error) {
    return NextResponse.json({status: 500, message: error})
  }
}

