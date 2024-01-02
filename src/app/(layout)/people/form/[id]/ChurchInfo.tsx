import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import Select2 from 'react-select'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { memberTitlesData } from '@/data/memberTitles'
import { churchesBranch } from '@/data/churchesBranch'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ChurchInfo(formControl: any) {
  function getAllTitles() {
    return memberTitlesData.map((title) => (
      <SelectItem key={title.id} value={title.id} className="cursor-pointer ">
        {title.name}
      </SelectItem>
    ))
  }

  function populateChurchesSelect() {
    interface IChurch {
      value: string
      label: string
    }

    const data: IChurch[] = []

    churchesBranch.map((church) => {
      const churchData: IChurch = {
        value: church,
        label: church,
      }
      data.push(churchData)
    })
    return data
  }

  return (
    <div className="flex flex-col gap-5 border rounded-lg border-gray-400 p-5 bg-white ">
      <h1 className="text-left">IGREJA</h1>
      {/* Início - Informações (Nome e sobrenome) */}
      <div className="flex gap-5 text-left">
        <FormField
          control={formControl}
          name="branch"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="required  ">Igreja</FormLabel>
              <Select2
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    borderColor: state.isFocused ? '#747474' : '#747474',
                    boxShadow: state.isFocused ? '#747474' : '#747474',
                  }),
                  placeholder: (baseStyles) => ({
                    ...baseStyles,
                    color: '#000',
                  }),
                  dropdownIndicator: (baseStyles) => ({
                    ...baseStyles,
                    color: '#747474',
                  }),
                  option: (baseStyles, state) => ({
                    ...baseStyles,
                    color: state.isFocused ? 'white' : 'black',
                    backgroundColor: state.isFocused ? '#406f7a' : 'white',
                  }),
                }}
                onChange={field.onChange}
                defaultInputValue={field.value}
                options={populateChurchesSelect()}
                className="w-full lg:min-w-80 lg:max-w-40 bg-white"
                placeholder="Selecione"
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={formControl}
          name="Society"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sociedade</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full lg:min-w-40 lg:max-w-40">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-white w-full">
                  <SelectItem value="SAF" className="cursor-pointer ">
                    SAF
                  </SelectItem>
                  <SelectItem value="UMP" className="cursor-pointer ">
                    UMP
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
              <FormLabel>Cargo</FormLabel>
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
