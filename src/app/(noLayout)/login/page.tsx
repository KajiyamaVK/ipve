import LoginForm from '@/app/(noLayout)/login/loginForm'
import Image from 'next/image'

export default function login() {
  return (
    <div className="flex w-full h-full">
      <div className="bg-loginBG w-1/2 bg-cover hidden md:inline-block" />
      <div className="bg-background w-full md:w-1/2 h-screen min-w-[500px] flex ">
        <div className="mt-32 flex flex-col text-left min-w-[300px] mx-auto">
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
