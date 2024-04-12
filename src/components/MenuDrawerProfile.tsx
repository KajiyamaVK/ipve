import { ImSpinner9 } from 'react-icons/im'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

export function MenuDrawerProfile() {
  function getPhotoUrl(): string | null {
    //return 'https://github.com/kajiyamavk.png'
    return '/images/system/logo.png'
  }
  return (
    <div className="flex flex-col  items-center bg-primary-dark p-5">
      <Avatar className="size-20 border-4 border-secondary bg-white">
        <AvatarImage src={getPhotoUrl() || '/avatar.png'} alt="Foto do usuário do sistema" />
        <AvatarFallback>
          <div className="animate-spin text-primary">
            <ImSpinner9 />
          </div>
        </AvatarFallback>
      </Avatar>
      <div className="flex w-full flex-col  items-center justify-center">
        <p className="block w-48 truncate text-center text-lg font-bold">Administrador</p>
        <p className="block w-48 truncate text-center text-sm">admin@ipve.com.br</p>
      </div>
    </div>
  )
}
