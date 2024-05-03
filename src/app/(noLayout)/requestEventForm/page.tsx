'use client'
import React, { useState, useEffect } from 'react'

export default function EventsForm() {
  const [imageUrl, setImageUrl] = useState('')
  const [textColor, setTextColor] = useState('') // eslint-disable-line 

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth
      const baseUrl = '/images/system/'

      // Decida qual URL usar com base no tamanho da tela
      if (screenWidth < 768) {
        setImageUrl(`${baseUrl}events_form_bg_mobile.jpg`)
        setTextColor('text-gray-900')
      } else {
        setImageUrl(`${baseUrl}bg_events_form.jpg`)
        setTextColor('text-gray-100')
      }
    }

    // Chame a função handleResize quando a janela for redimensionada
    window.addEventListener('resize', handleResize)

    // Chame handleResize quando o componente for montado
    handleResize()

    // Remova o listener de redimensionamento quando o componente for desmontado
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <form className="text-gray-100">
      <div style={{ backgroundImage: `url(${imageUrl})` }} className={`min-h-screen bg-cover bg-no-repeat`}></div>
    </form>
  )
}
