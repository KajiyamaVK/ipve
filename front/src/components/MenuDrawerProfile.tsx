import { ImSpinner9 } from 'react-icons/im'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

export function MenuDrawerProfile() {
  function getPhotoUrl(): string | null {
    //return 'https://github.com/kajiyamavk.png'
    return '/images/system/logo.png'
  }
  return (
    <div className="flex flex-col  p-5 bg-primary-dark items-center">
      <Avatar className="border-4 border-secondary w-20 h-20 bg-white">
        <AvatarImage src={getPhotoUrl() || '/avatar.png'} alt="Foto do usuário do sistema" />
        <AvatarFallback>
          <div className="animate-spin text-primary">
            <ImSpinner9 />
          </div>
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col justify-center  w-full items-center">
        <p className="text-lg font-bold overflow-ellipsis whitespace-nowrap block w-48 overflow-hidden text-center">
          Administrador
        </p>
        <p className="overflow-ellipsis whitespace-nowrap block w-48 overflow-hidden text-sm text-center">
          admin@ipve.com.br
        </p>
      </div>
    </div>
  )
}
