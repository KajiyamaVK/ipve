'use client'
import Button from './ui/button'
import { Input } from './ui/input'
import { FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Cookie from 'js-cookie'

export default function LoginForm() {
  const router = useRouter()
  function markAsLogged(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    Cookie.set('ipve_auth_token', 'ajahdgfkajsdhgkh')
    console.log('1')
    router.push('/dashboard')
    console.log(2)
  }

  return (
    <>
      <div className="text-align-left bg-primary">
        <h1 className="text-white ml-4">LOGIN</h1>
      </div>
      <form
        action=""
        className="mt-6 flex flex-col  justify-left items-left gap-2"
        onSubmit={(e) => markAsLogged(e)}
      >
        <Input
          type="text"
          name="email"
          placeholder="Email"
          className="focus:outline-none focus:border-b-[3px]"
        />
        <Input type="password" name="senha" placeholder="Senha" />

        <Button className="mt-6 mx-auto w-full" type="submit">
          Entrar
        </Button>
      </form>
    </>
  )
}
