import React from 'react'
import styles from '@/app/dashboard/layout.module.css'

import User from '@/models/user'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import { Sidebar } from '@/organisms/sidebar/Sidebar'
import { connectDB } from '@/utils/connectDB'

type AdminProps = {
  children: React.ReactNode
}

export default async function Admin({
  children
} : AdminProps){

  await connectDB()
  const session = await getServerSession(authOptions)

  if (!session) redirect('/signin')

  const user = await User.findOne({ email: session.user?.email })
  if (user.role !== 'ADMIN') redirect('/')

  return (
    <div className={styles.container}>
      <Sidebar email={user.email} role={user.role} />
      <div className={styles.main}>{children}</div>
    </div>
  )
}