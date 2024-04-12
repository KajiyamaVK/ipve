import { Checkbox } from '@/components/ui/checkbox'
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
//
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ActiveControl(formControl: any) {
  return (
    <div className="mt-5 flex justify-start gap-5">
      <FormField
        control={formControl}
        name="isActive"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center space-x-1 space-y-0 ">
            <FormControl>
              <Checkbox checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>Cadastro ativo?</FormLabel>
            </div>
          </FormItem>
        )}
      />

      <FormField
        control={formControl}
        name="isMember"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center space-x-1 space-y-0 ">
            <FormControl>
              <Checkbox checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>Membro?</FormLabel>
            </div>
          </FormItem>
        )}
      />
    </div>
  )
}
