import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import Signin from '@/organisms/signin/Signin'
import { redirect } from 'next/navigation'

const SigninPage = async () => {

  const session = await getServerSession(authOptions)
  if(session) redirect('/')

  return (
    <Signin />
  )
}

export default SigninPage