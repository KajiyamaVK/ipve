import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { handleCepMask } from '@/utils/handleCepMask'
import { KeyboardEvent } from 'react'

export function AddressDataInfo(form: any) {
  function handleCepChanges(e: KeyboardEvent<HTMLInputElement>) {
    const { value } = e.currentTarget
    const cep = handleCepMask(value, e)
    form.setValue('cep', cep)
  }
  return (
    <div className="flex flex-col gap-5 mt-5 border rounded-lg p-10">
      <h1 className="text-left text-2xl font-bold">Endereço</h1>

      {/* Início - Informações (Cep, endereço e número) */}
      <div className="flex flex-wrap gap-5">
        <FormField
          control={form.control}
          name="cep"
          render={({ field }) => (
            <FormItem className="text-left">
              <FormLabel>CEP</FormLabel>
              <FormControl>
                <Input
                  placeholder="Ex.: 12345-010"
                  className="w-full lg:min-w-40 lg:max-w-40"
                  maxLength={9}
                  onKeyDown={(e) => {
                    handleCepChanges(e)
                  }}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Fim - Informações (Cep) */}

        {/* Início - Informações (Endereço e número) */}
        <div className="flex gap-5">
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="text-left">
                <FormLabel>Endereço (sem o número)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ex.: Praça José Gebara"
                    className="min-w-80 max-w-96"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="number"
            render={({ field }) => (
              <FormItem className="text-left">
                <FormLabel>Número</FormLabel>
                <FormControl>
                  <Input placeholder="Ex.: 15A" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
      {/* Fim - Informações (Cep, endereço e número) */}

      {/* Início - Informações (complemento e bairro) */}
      <div className="flex gap-5 ">
        <FormField
          control={form.control}
          name="complement"
          render={({ field }) => (
            <FormItem className="text-left flex-1">
              <FormLabel>Complemento</FormLabel>
              <FormControl>
                <Input
                  placeholder="Ex.: Apto 123"
                  className=" w-full"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="suburb"
          render={({ field }) => (
            <FormItem className="text-left flex-1">
              <FormLabel>Bairro</FormLabel>
              <FormControl>
                <Input
                  placeholder="Ex.: Vila Euthalia"
                  className=" w-full"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Fim - Informações (complemento e bairro) */}

      {/* Início - Informações (cidade e estado) */}
      <div className="flex gap-5">
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem className="text-left flex-1">
              <FormLabel>Cidade</FormLabel>
              <FormControl>
                <Input placeholder="Ex.: São Paulo" w-full {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="state"
          render={({ field }) => (
            <FormItem className="text-left flex-1">
              <FormLabel>Estado</FormLabel>
              <FormControl>
                <Input placeholder="Ex.: SP" w-full {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      {/* Fim - Informações (cidade e estado) */}
    </div>
  )
}
