'use client'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { schema } from './schema'
import { zodResolver } from '@hookform/resolvers/zod'

export default function peopleForm() {
  const { register, handleSubmit } = useForm({ resolver: zodResolver(schema) })
  return (
    <form className="m-10">
      <div className="flex gap-5">
        <div>
          <label htmlFor="name">Primeiro nome</label>
          <Input type="text" {...register('name')} className="w-96" />
          <p></p>
        </div>
        <div>
          <label htmlFor="name">Sobrenome</label>
          <Input type="text" {...register('surname')} className="w-96" />
        </div>
      </div>
    </form>
  )
}
