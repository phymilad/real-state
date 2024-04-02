import Profile from '@/models/profile';
import {Profile as ProfileCOmponent} from '@/organisms/profile/Profile';
import { connectDB } from '@/utils/connectDB';
import React from 'react'

type EditProfileProps = {
  params: {
    profileId: string
  }
}

const EditProfile = async ({ 
  params: { 
    profileId
  } 
} : EditProfileProps) => {

  await connectDB();
  const profile = await Profile.findOne({ _id: profileId })

  if (!profile) return <h3>مشکلی پیش آمده است. لطفا دوباره امتحان کنید ...</h3>;

  return <ProfileCOmponent data={JSON.parse(JSON.stringify(profile))} />;

}

export default EditProfile