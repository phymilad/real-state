"use client"
import React, { useState } from 'react'
import styles from '@/organisms/signup/signup.module.css'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const Signup = () => {

  const navigate = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (password !== repeatPassword) return
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({email, password}),
      headers: {"Content-type": "application/json"}
    })
    if (res.status === 200) return navigate.push('/signin')
  }

  return (
    <div className={styles.form}>
      <h4>فرم ثبت نام</h4>
      <form onSubmit={e => handleSubmit(e)}>
        <label>ایمیل</label>
        <input 
          type='text'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>رمز عبور</label>
        <input 
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label>تکرار رمز عبور</label>
        <input 
          type='password'
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
        />
        <button type='submit'>ثبت نام</button>
      </form>
      <p>
        حساب کاربری دارید؟
        <Link href="/signin">ورود</Link>
      </p>
    </div>
  )
}

export default Signup