"use client"

import React from 'react'
import { LogoutCurve } from 'iconsax-react'
import styles from '@/molecules/logout-button/logout.module.css'
import { useRouter } from 'next/navigation'
import { clearCookie } from '@/utils/storage'
import { signOut } from 'next-auth/react'

export const Logout = () => {

  const navigate = useRouter()

  const handleLogout = () => {
    navigate.push('/signin')
    signOut()
  }

  return (
    <div className={styles.container} onClick={handleLogout}>
      <LogoutCurve size="32" color="#FF0000"/>
      <p>خروج</p>
    </div>
  )
}
