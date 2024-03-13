import { writeFile } from 'fs/promises'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const data = await request.formData()
  const file: File | null = data.get('photo') as unknown as File

  if (!file) {
    return NextResponse.json({ success: false, message: 'No file found' })
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const path = `./public/images/users/${file.name}`

  try {
    await writeFile(path, buffer)
  } catch (error) {
    return NextResponse.json({ success: false, message: `Error uploading file: ${error}` })
  }

  return NextResponse.json({ success: true, message: 'File uploaded' })
}
