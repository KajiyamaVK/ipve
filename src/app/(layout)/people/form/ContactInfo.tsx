import { Checkbox } from '@/components/ui/checkbox'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

export function ContactInfo(form: any) {
  return (
    <div className="  mt-5 border-gray-300 border p-5 w-1/2 ">
      <h1 className="text-left text-2xl font-bold mb-5">Contato</h1>
      {/* Início - Informações (Email e telefone) */}
      <div className="flex gap-5 p-5">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="text-left">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Ex.: contato@ipb.com.br"
                  type="email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-5">
          <div className="flex flex-col justify-center">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="text-left">
                  <FormLabel>Celular</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="(11) 99999-5555"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="mobileIsWhatsapp"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-3 space-y-0 mt-1 self-end">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={form.watch('mobileNumber')?.length !== 15}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="font-normal italic">
                      Whatsapp?
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="text-left">
                <FormLabel>Outro Telefone</FormLabel>
                <FormControl>
                  <Input placeholder="(11) 9999-5555" type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
      {/* Fim - Informações (Email e telefone) */}

      {/* Início - Cargo */}

      {/* Fim - Cargo */}
    </div>
  )
}
