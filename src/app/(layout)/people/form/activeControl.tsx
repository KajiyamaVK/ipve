import { Checkbox } from '@/components/ui/checkbox'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'

export function ActiveControl(formControl: any) {
  return (
    <div className="flex flex-col gap-2 justify-center mt-5">
      <FormField
        control={formControl}
        name="isActive"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center space-x-3 space-y-0 ">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>Cadastro ativo?</FormLabel>
            </div>
          </FormItem>
        )}
      />
    </div>
  )
}
