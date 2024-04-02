import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import Signup from "@/organisms/signup/Signup"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

const SignupPage = async () => {

  const session = await getServerSession(authOptions)
  if(session) redirect('/') 

  return (
    <Signup />
  )
}

export default SignupPage