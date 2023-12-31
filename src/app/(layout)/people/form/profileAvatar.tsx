import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import Image from 'next/image'

export function ProfileAvatar(formControl: any) {
  return (
    <FormField
      control={formControl}
      name="photoUrl"
      render={({ field }) => (
        <FormItem className="text-left">
          <FormLabel>
            <div className="flex flex-col items-center my-auto mr-10">
              <Image
                src={/* form.watch('photoUrl') || */ '/avatar.png'}
                alt="avatar_photo"
                height={150}
                width={150}
                objectFit="cover"
                className="rounded-full border-[10px] border-primary hover:border-primary-dark hover:bg-gray-300 cursor-pointer"
              />
              <center>
                <p className="mx-auto">Clique para editar</p>
              </center>
            </div>
          </FormLabel>
          <FormControl>
            <Input
              placeholder=""
              type="file"
              accept="image/*"
              className="hidden"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
