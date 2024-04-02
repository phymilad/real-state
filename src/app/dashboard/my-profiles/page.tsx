import User from '@/models/user'
import { connectDB } from '@/utils/connectDB'
import { getServerSession } from 'next-auth'
import React from 'react'
import styles from '@/app/dashboard/my-profiles/myProfile.module.css'
import DashboardCard from '@/molecules/dashboard-card/DashboardCard'

const MyProfiles = async () => {

  await connectDB()
  const session = await getServerSession()

  const [ user ] = await User.aggregate([
    {$match: { email: session?.user?.email }},
    {$lookup: {
      from: 'profiles',
      foreignField: 'userId',
      localField: '_id',
      as: 'profiles'
    }}
  ])

  return (
    <div>
      {user?.profiles?.length ? null : (
        <p className={styles.text}>هیچ آگهی ثبت نشده است</p>
      )}
      {user?.profiles?.map((i: any) => (
        <DashboardCard key={i._id} data={JSON.parse(JSON.stringify(i))} />
      ))}
    </div>
  )
}

export default MyProfiles