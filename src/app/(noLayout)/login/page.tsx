import LoginForm from '@/app/(noLayout)/login/loginForm'
import Image from 'next/image'

export default function login() {
  return (
    <div className="flex size-full">
      <div className="hidden w-1/2 bg-loginBG bg-cover md:inline-block" />
      <div className="flex h-screen w-full min-w-[500px] bg-background md:w-1/2 ">
        <div className="mx-auto mt-32 flex min-w-[300px] flex-col text-left">
          <center className="mb-10">
            <Image
              src="/images/system/logo.png"
              alt="IPVE Logo - cruz branca com um fundo em uma mistura não uniforme entre verde e azul"
              width={150}
              height={150}
            />
          </center>
          <LoginForm />
        </div>
      </div>
    </div>
  )
}
