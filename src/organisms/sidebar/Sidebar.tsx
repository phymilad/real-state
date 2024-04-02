import React from 'react'
import { User as UserIcon } from 'iconsax-react'
import styles from '@/organisms/sidebar/sidebar.module.css'
import Link from 'next/link'
import { Logout } from '@/molecules/logout-button/Logout'

type SidebarProps = {
  role: "ADMIN" | "USER"
  email: string
}

export const Sidebar = ({
  role,
  email
} : SidebarProps) => {
  return (
    <div className={styles.sidebar}>
      <UserIcon size="32" color="#304ffe"/>
      {role === "ADMIN" ? "ادمین" : null}
      <p>{email}</p>
      <span></span>
      <Link href="/dashboard">حساب کاربری</Link>
      <Link href="/dashboard/my-profiles">آگهی های من</Link>
      <Link href="/dashboard/add">ثبت آگهی</Link>
      {role === "ADMIN" && <Link href="/admin">در انتظار تایید</Link>}
      <div className={styles.logout}>
        <Logout />
      </div>
    </div>
  )
}
