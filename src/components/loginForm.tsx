'use client'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { useRouter } from 'next/navigation'
import Cookie from 'js-cookie'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

export default function LoginForm() {
  const schema = z.object({
    email: z
      .string()
      .min(1, 'O email é obrigatório.')
      .email('O formato do email está incorreto, por favor verifique.'),
    password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres.'),
  })

  const router = useRouter()
  const { register, handleSubmit, formState } = useForm({
    resolver: zodResolver(schema),
  })

  function markAsLogged() {
    Cookie.set('ipve_auth_token', 'ajahdgfkajsdhgkh')

    router.push('/dashboard')
  }

  console.log('formState', formState)

  return (
    <>
      <div className="text-align-left bg-primary">
        <h1 className="text-white ml-4">LOGIN</h1>
      </div>
      <form
        action=""
        className="mt-6 flex flex-col  justify-left items-left gap-2"
        onSubmit={handleSubmit(markAsLogged)}
      >
        <Input
          type="text"
          placeholder="Email"
          className="focus:outline-none focus:border-b-[3px]"
          {...register('email')}
        />
        <Input type="password" placeholder="Senha" {...register('password')} />

        <Button className="mt-6 mx-auto w-full" type="submit">
          Entrar
        </Button>
        <pre>
          <code>{JSON.stringify(formState, null, 2)}</code>
        </pre>
      </form>
    </>
  )
}
