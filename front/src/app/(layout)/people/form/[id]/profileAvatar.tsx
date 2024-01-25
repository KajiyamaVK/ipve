import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ImSpinner9 } from 'react-icons/im'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ProfileAvatar(formControl: any) {
  return (
    <FormField
      control={formControl}
      name="photoUrl"
      render={({ field }) => (
        <FormItem className="text-left min-w-36 md:min-w-52">
          <FormLabel>
            <div className="flex flex-col items-center my-auto mr-10">
              <Avatar className="border-4 border-secondary w-48 h-48 bg-white cursor-pointer">
                <AvatarImage src={field.value || '/avatar.png'} alt="Foto do usuário do sistema" />
                <AvatarFallback>
                  <div className="animate-spin text-primary">
                    <ImSpinner9 />
                  </div>
                </AvatarFallback>
              </Avatar>
              <center>
                <p className="mx-auto">Clique para editar</p>
              </center>
            </div>
          </FormLabel>
          <FormControl>
            <Input placeholder="" type="file" accept="image/*" className="hidden" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
