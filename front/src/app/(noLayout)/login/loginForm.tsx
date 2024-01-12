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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useState } from 'react'

export default function LoginForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof loginFormValidationSchema>>({
    resolver: zodResolver(loginFormValidationSchema),
  })

  function markAsLogged(router: AppRouterInstance) {
    setIsLoading(true)
    router.push('/dashboard')
    Cookie.set('ipve_auth_token', 'ajahdgfkajsdhgkh', { expires: 7 })
  }

  return (
    <div className="max-w-96 min-w-96">
      <div className="text-align-left bg-primary">
        <h1 className="text-white ml-4">LOGIN</h1>
      </div>
      <Form {...form}>
        <form
          action=""
          className="mt-6 flex flex-col  justify-left items-left gap-2"
          onSubmit={form.handleSubmit(() => markAsLogged(router))}
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="text-left">
                <FormLabel className="required">E-mail</FormLabel>
                <FormControl>
                  <Input
                    id={1}
                    placeholder="Ex.: igreja@ipve.com.br"
                    {...field}
                  />
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
                  <Input
                    id={2}
                    placeholder="Senha"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            className="mt-6 mx-auto w-full flex gap-2"
            aria-label="login"
            type="submit"
            isLoading={isLoading}
          >
            <RiLoginCircleLine />
            Entrar
          </Button>
        </form>
      </Form>
    </div>
  )
}
