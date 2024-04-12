'use client'
import { Button } from '../../../components/ui/button'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { loginFormValidationSchema } from './inputValidationSchema'
import Cookie from 'js-cookie'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { z } from 'zod'
import { RiLoginCircleLine } from 'react-icons/ri'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useState } from 'react'

export default function LoginForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof loginFormValidationSchema>>({
    resolver: zodResolver(loginFormValidationSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  function markAsLogged(router: AppRouterInstance) {
    if (form.watch('email') === 'admin@ipve.com.br' && form.watch('password') === 'admin123') {
      setIsLoading(true)
      Cookie.set('ipve_auth_token', 'ajahdgfkajsdhgkh', { expires: 7 })
      router.push('/dashboard')
    } else {
      alert('Usuário ou senha inválidos')
    }
  }

  return (
    <div className="min-w-96 max-w-96">
      <div className="bg-primary">
        <h1 className="ml-4 text-white">LOGIN</h1>
      </div>
      <Form {...form}>
        <form action="" className="mt-6 flex flex-col gap-2" onSubmit={form.handleSubmit(() => markAsLogged(router))}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="text-left">
                <FormLabel className="required">E-mail</FormLabel>
                <FormControl>
                  <Input placeholder="Ex.: igreja@ipve.com.br" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="text-left">
                <FormLabel className="required">Senha</FormLabel>
                <FormControl>
                  <Input placeholder="Senha" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="mx-auto mt-6 flex w-full gap-2" aria-label="login" type="submit" isLoading={isLoading}>
            <RiLoginCircleLine />
            Entrar
          </Button>
        </form>
      </Form>
    </div>
  )
}
