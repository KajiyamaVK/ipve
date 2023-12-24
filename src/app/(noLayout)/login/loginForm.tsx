'use client'
import { Button } from '../../../components/ui/button'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { loginFormValidationSchema } from './inputValidationSchema'
import Cookie from 'js-cookie'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

const inputClasses = 'w-full'

export default function LoginForm() {
  const router = useRouter()
  const { register, handleSubmit, formState } = useForm({
    resolver: zodResolver(loginFormValidationSchema),
  })

  function markAsLogged(router: AppRouterInstance) {
    router.push('/dashboard')
    Cookie.set('ipve_auth_token', 'ajahdgfkajsdhgkh')
  }

  return (
    <div className="max-w-96 min-w-96">
      <div className="text-align-left bg-primary">
        <h1 className="text-white ml-4">LOGIN</h1>
      </div>
      <form
        action=""
        className="mt-6 flex flex-col  justify-left items-left gap-2"
        onSubmit={handleSubmit(() => markAsLogged(router))}
      >
        <Input
          type="text"
          placeholder="E-mail"
          className="w-full"
          {...register('email')}
        />
        <p className="text-destructive">
          {formState.errors.email?.message?.toString()}
        </p>

        <Input
          type="password"
          placeholder="Senha"
          className="w-full"
          {...register('password')}
        />
        <p className="text-destructive">
          {formState.errors.password?.message?.toString()}
        </p>

        <Button className="mt-6 mx-auto w-full" type="submit">
          Entrar
        </Button>
      </form>
    </div>
  )
}
