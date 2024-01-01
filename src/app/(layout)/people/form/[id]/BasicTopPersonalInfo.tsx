import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function BasicTopPersonalInfo(formControl: any) {
  return (
    <div className="flex flex-col gap-5 border rounded-lg border-gray-400 p-5 bg-white">
      <h1 className="text-left">DADOS PESSOAIS</h1>
      {/* Início - Informações (Nome e sobrenome) */}
      <div className="flex gap-5 ">
        <FormField
          control={formControl}
          name="name"
          render={({ field }) => (
            <FormItem className="text-left">
              <FormLabel className="required">Primeiro Nome</FormLabel>
              <FormControl>
                <Input
                  placeholder="Ex.: Fulano"
                  className="w-full lg:min-w-40 lg:max-w-40"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={formControl}
          name="surname"
          render={({ field }) => (
            <FormItem className="text-left">
              <FormLabel className="required">Sobrenome</FormLabel>
              <FormControl>
                <Input
                  placeholder="Silva"
                  {...field}
                  className="w-full lg:min-w-40 lg:max-w-40"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={formControl}
          name="dateOfBirth"
          render={({ field }) => (
            <FormItem className="text-left">
              <FormLabel>Data de nascimento</FormLabel>
              <FormControl>
                <Input
                  placeholder="01/01/1900"
                  type="date"
                  className="w-full lg:min-w-40 lg:max-w-40"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={formControl}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="required ">Gênero</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full lg:min-w-40 lg:max-w-40">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-white w-full">
                  <SelectItem value="Masculino" className="cursor-pointer ">
                    Masculino
                  </SelectItem>
                  <SelectItem value="Feminino" className="cursor-pointer ">
                    Feminino
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Fim - Dt Nascimento e Ativo */}
    </div>
  )
}