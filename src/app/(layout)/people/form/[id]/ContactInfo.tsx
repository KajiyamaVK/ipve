import { Checkbox } from '@/components/ui/checkbox'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ContactInfo(form: any) {
  return (
    <div className="  mt-5 w-1/2 border border-gray-400 bg-white p-5">
      <h1 className="mb-5 text-left text-2xl font-bold">Contato</h1>
      {/* Início - Informações (Email e telefone) */}
      <div className="flex flex-col gap-5 p-5">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="text-left">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Ex.: contato@ipb.com.br" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-5">
          <div className="flex flex-col justify-center">
            <FormField
              control={form.control}
              name="phone1"
              render={({ field }) => (
                <FormItem className="text-left">
                  <FormLabel>Celular</FormLabel>
                  <FormControl>
                    <Input placeholder="(11) 99999-5555" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone1IsWhatsapp"
              render={({ field }) => (
                <FormItem className="mt-1 flex flex-row items-center space-x-3 space-y-0 self-start">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={form.watch('phone1')?.length !== 15}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="font-normal italic">Whatsapp?</FormLabel>
                  </div>
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="phone2"
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
    </div>
  )
}
