'use client'

import Image from 'next/image'

export default function Loading() {
  return (
    <div className="  flex size-full items-center justify-center overflow-hidden bg-black/50 transition-opacity">
      <div className="screenLoader">
        <Image
          alt="Tela está carregando com o logo da IPVE pulsando"
          src={'/images/system/logo.png'}
          width={200}
          height={200}
        ></Image>
      </div>
    </div>
  )
}
