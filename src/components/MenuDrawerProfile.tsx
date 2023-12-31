import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

export function MenuDrawerProfile() {
  return (
    <div className="flex gap-5 p-5 bg-primary-dark">
      <Avatar className="border-4 border-white w-20 h-20">
        <AvatarImage
          src="https://github.com/kajiyamavk.png"
          alt="Foto do usuário do sistema"
        />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="flex flex-col justify-center gap-2 w-full">
        <p className="text-lg font-bold overflow-ellipsis whitespace-nowrap block w-48 overflow-hidden">
          Victor Kajiyama
        </p>
        <p className="overflow-ellipsis whitespace-nowrap block w-48 overflow-hidden text-sm">
          victor.kajiyama@gmail.com
        </p>
      </div>
    </div>
  )
}
