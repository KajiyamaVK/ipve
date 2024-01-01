import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { memberTitlesData } from '@/data/memberTitles'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ChurchInfo(formControl: any) {
  function getAllTitles() {
    return memberTitlesData.map((title) => (
      <SelectItem key={title.id} value={title.id} className="cursor-pointer ">
        {title.name}
      </SelectItem>
    ))
  }
  return (
    <div className="flex flex-col gap-5 border rounded-lg border-gray-400 p-5 bg-white ">
      <h1 className="text-left">IGREJA</h1>
      {/* Início - Informações (Nome e sobrenome) */}
      <div className="flex gap-5 text-left">
        <FormField
          control={formControl}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="required  ">Igreja</FormLabel>
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
        <FormField
          control={formControl}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="required ">Cargo</FormLabel>
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
        <FormField
          control={formControl}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sociedade</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full lg:min-w-40 ">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-white ">
                  {getAllTitles()}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={formControl}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sala EBD</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full lg:min-w-40 ">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-white ">
                  {getAllTitles()}
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
