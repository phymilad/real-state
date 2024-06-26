import Link from 'next/link'
import React from 'react'
import styles from '@/app/dashboard/layout.module.css'

import User from '@/models/user'
import { Logout } from '@/molecules/logout-button/Logout'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import { Sidebar } from '@/organisms/sidebar/Sidebar'

type DashboardLayoutProps = {
  children: React.ReactNode
}

export default async function DashboardLayout({
  children
} : DashboardLayoutProps){

  const session = await getServerSession(authOptions) 
  
  if(!session) return redirect("/signin")

  const user = await User.findOne({ email: session?.user?.email })
  console.log("user: ", user)

  return (
    <div className={styles.container}>
      <Sidebar email={user.email} role={user.role} />
      <div className={styles.main}>{children}</div>
    </div>
  )
}