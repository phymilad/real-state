import React from 'react'
import { connectDB } from '@/utils/connectDB'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import User from '@/models/user'
import Profile from '@/models/profile'

const Admin = async () => {

  await connectDB()
  const session = await getServerSession()

  if (!session) redirect('/signin')

  const user = await User.findOne({ email: session.user?.email })
  if (user.role !== 'ADMIN') redirect('/')

  const uncertifiedProfiles = await Profile.find({ certified: false })

  console.log('uncertifiedProfiles: ', uncertifiedProfiles)

  return (
    <div>Admin Page</div>
  )
}

export default Admin