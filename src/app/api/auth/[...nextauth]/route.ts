import NextAuth, { SessionStrategy } from 'next-auth'
import User from '@/models/user'
import { connectDB } from '@/utils/connectDB'
import CredentialsProvider from 'next-auth/providers/credentials'
import { NextResponse } from 'next/server'
import { comparePassword } from '@/utils/auth'

export const authOptions = {
  session: {strategy: "jwt" as SessionStrategy},
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        try {
          const { email, password } = credentials as {email: string, password: string}
          await connectDB()
          if(!email || !password) {
            return NextResponse.json(
              {error: 'لطفا اطلاعات معتبر وارد کنید'},
              {status: 422}
            )
          }

          const user = await User.findOne({email})
          if(!user) throw new Error("کاربری با این مشخصات یافت نشد")
          
          const isValid = await comparePassword(password, user.password)
          if(!isValid) throw new Error("کاربری با این مشخصات یافت نشد")

          return { email }


        } catch (error) {
          throw new Error("مشکلی در سرور رخ داده است")
        }

      }
    })
  ]
}
const handler = NextAuth(authOptions)

export {handler as GET, handler as POST}