import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Dispatch, ReactNode } from 'react'

interface IColorSelected {
  colorSelected: string
  setColorSelected: Dispatch<React.SetStateAction<string>>
  isDisabled: boolean
}

export const availableColors: string[] = [
  'bg-red-500',
  'bg-yellow-500',
  'bg-green-500',
  'bg-blue-500',
  'bg-indigo-500',
  'bg-purple-500',
  'bg-pink-500',
  'bg-black',
  'bg-white',
]

export function DialogColorSelection({
  colorSelected,
  setColorSelected,
  isDisabled,
}: IColorSelected) {
  const colorCircle: ReactNode = (
    <div className="flex items-center justify-center">
      <div
        className={`w-5 h-5 rounded-full shadow-md shadow-black ${colorSelected} ${
          isDisabled ? 'opacity-50' : ''
        }`}
      ></div>
    </div>
  )
  return (
    <div>
      {!isDisabled ? (
        <Dialog>
          <DialogTrigger>{colorCircle}</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Selecione uma cor</DialogTitle>
              <DialogDescription>
                Escolha uma cor para identificar a responsabilidade
              </DialogDescription>
            </DialogHeader>
            <DialogClose>
              <div className="flex flex-wrap gap-2">
                {availableColors.map((color) => (
                  <div
                    key={color}
                    className={`w-10 h-10 rounded-full cursor-pointer ${color} hover:shadow-md hover:shadow-black`}
                    onClick={() => setColorSelected(color)}
                  ></div>
                ))}
              </div>
            </DialogClose>
          </DialogContent>
        </Dialog>
      ) : (
        colorCircle
      )}
    </div>
  )
}
