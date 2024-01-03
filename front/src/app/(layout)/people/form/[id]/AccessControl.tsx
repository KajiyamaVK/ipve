import { Checkbox } from '@/components/ui/checkbox'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { menuItems } from '@/data/menuItems'
import { TMenuDrawerItem } from '@/types/TMenuDrawerItem'

interface IAcessControl {
  className?: string

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: any
}

export function AccessControl({ className, form }: IAcessControl) {
  function screensAccessControl() {
    return menuItems.map((item: TMenuDrawerItem) => (
      <div key={item.id}>
        <FormField
          control={form.control}
          name={item.id}
          render={({ field }) => (
            <FormItem className="flex flex-row items-center space-x-2 space-y-0 ">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-0 leading-none">
                <FormLabel>{item.menuLabel}</FormLabel>
              </div>
            </FormItem>
          )}
        />
        <div className="mt-2">
          {typeof item.children !== 'undefined' &&
            item.children?.length > 0 &&
            item.children?.map((subMenuItem: TMenuDrawerItem) => (
              <FormField
                key={subMenuItem.id}
                control={form.control}
                name={subMenuItem.id}
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-3 space-y-1 ml-5 gap-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>{subMenuItem.menuLabel}</FormLabel>
                    </div>
                  </FormItem>
                )}
              />
            ))}
        </div>
      </div>
    ))
  }

  return (
    <div className={className}>
      <h1>Controle de Acessos</h1>
      <div className="flex flex-col  mt-5">{screensAccessControl()}</div>
    </div>
  )
}
