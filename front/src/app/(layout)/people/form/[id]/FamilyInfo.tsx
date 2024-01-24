'use client'

import { Checkbox } from '@/components/ui/checkbox'
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Skeleton } from '@/components/ui/skeleton'
import { TPeopleGridHeader } from '@/types/TPeopleGridHeader'
import { getData } from '@/utils/fetchData'
import { useEffect, useState } from 'react'
import Select from 'react-select'

// eslint-disable-next-line
export default function FamilyInfo(form: any) {
  const [options, setOptions] = useState<string[]>([])

  useEffect(() => {
    ;(async () => {
      const data: TPeopleGridHeader[] = await getData({
        endpoint: 'people',
      })
      const people: string[] = data.map((p: TPeopleGridHeader) => p.fullName)
      console.log('people', people)
      setOptions(people)
    })()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  // }, [form.watch('hasFamilyInChurch')])
  return (
    <div className="flex gap-10">
      <FormField
        control={form.control}
        name="hasFamilyInChurch"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center space-x-3 space-y-0 ">
            <FormControl>
              <Checkbox checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>Possui família na igreja?</FormLabel>
            </div>
          </FormItem>
        )}
      />
      <div>{form.watch('hasFamilyInChurch') ? <Select options={options} /> : <Skeleton className="h-10 w-36" />}</div>
    </div>
  )
}
