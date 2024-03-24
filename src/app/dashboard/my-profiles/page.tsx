import User from '@/models/user'
import { connectDB } from '@/utils/connectDB'
import { getServerSession } from 'next-auth'
import React from 'react'

const MyProfiles = async () => {

  await connectDB()
  const session = await getServerSession()
  console.log('MyProfiles page: ', session)

  const [user] = await User.aggregate([
    {$match: { email: session?.user?.email }},
    {$lookup: {
      from: 'profiles',
      foreignField: 'userId',
      localField: '_id',
      as: 'profiles'
    }}
  ])

  console.log('user: ', user)

  return (
    <div>
      my-profiles
    </div>
  )
}

export default MyProfiles