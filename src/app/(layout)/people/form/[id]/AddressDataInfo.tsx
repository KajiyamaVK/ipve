import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { formatCEP } from '@/utils/maskFunctions'
import { KeyboardEvent } from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function AddressDataInfo(form: any) {
  function handleCepChanges(e: KeyboardEvent<HTMLInputElement>) {
    const { value } = e.currentTarget
    //const cep = handleCepMask(value, e)
    const cep = formatCEP(value)
    form.setValue('cep', cep)
  }
  return (
    <div className="mt-5 flex flex-col gap-5 rounded-lg border border-gray-400 bg-white p-10">
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
                  <Input placeholder="Ex.: Praça José Gebara" className="min-w-80 max-w-96" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="addressNumber"
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
            <FormItem className="flex-1 text-left">
              <FormLabel>Complemento</FormLabel>
              <FormControl>
                <Input placeholder="Ex.: Apto 123" className=" w-full" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="suburb"
          render={({ field }) => (
            <FormItem className="flex-1 text-left">
              <FormLabel>Bairro</FormLabel>
              <FormControl>
                <Input placeholder="Ex.: Vila Euthalia" className=" w-full" {...field} />
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
            <FormItem className="flex-1 text-left">
              <FormLabel>Cidade</FormLabel>
              <FormControl>
                <Input placeholder="Ex.: São Paulo" className="w-full" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="uf"
          render={({ field }) => (
            <FormItem className="flex-1 text-left">
              <FormLabel>Estado</FormLabel>
              <FormControl>
                <Input placeholder="Ex.: SP" className="w-full" {...field} />
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
