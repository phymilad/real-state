"use client"
import React, { useState } from 'react'
import styles from '@/styles/signup.module.css'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'

const Signin = () => {

  const navigate = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const res = await signIn("credentials", {email, password, redirect: false})
    console.log("res: ", res)
    if(!res?.error) navigate.push("/")
    // const res = await fetch("/api/auth/signin", {
    //   method: "POST",
    //   body: JSON.stringify({email, password}),
    //   headers: {"Content-type": "application/json"}
    // })
    // if (res.status === 200) return navigate.push('/')
  }

  return (
    <div className={styles.form}>
      <h4>فرم ورود</h4>
      <form onSubmit={handleSubmit}>
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
        <button type='submit'>ورود</button>
      </form>
      <p>
        حساب کاربری ندارید؟
        <Link href="/signup">ثبت نام</Link>
      </p>
    </div>
  )
}

export default Signin