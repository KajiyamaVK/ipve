'use client'

import Image from 'next/image'

export default function Loading() {
  return (
    <div className=" flex justify-center items-center bg-black bg-opacity-50 transition-opacity h-full w-full overflow-hidden">
      <div className="screenLoader">
        <Image
          alt="Tela está carregando com o logo da IPVE pulsando"
          src={'/logo.png'}
          width={200}
          height={200}
        ></Image>
      </div>
    </div>
  )
}
