import Link from 'next/link'
import React from 'react'
import styles from '@/app/dashboard/layout.module.css'
import { User } from 'iconsax-react'
import { Logout } from '@/molecules/logout-button/Logout'

type DashboardLayoutProps = {
  children: React.ReactNode
}

export default function DashboardLayout({
  children
} : DashboardLayoutProps){
  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <User size="32" color="#304ffe"/>
        {/* <CgProfile />
        {role === "ADMIN" ? "ادمین" : null}
        <p>{email}</p> */}
        <span></span>
        <Link href="/dashboard">حساب کاربری</Link>
        <Link href="/dashboard/my-profiles">آگهی های من</Link>
        <Link href="/dashboard/add">ثبت آگهی</Link>
        {/* {role === "ADMIN" ? <Link href="/admin">در انتظار تایید</Link> : null}
        <LogoutButton /> */}
        <Logout />
      </div>
      <div className={styles.main}>{children}</div>
    </div>
  )
}