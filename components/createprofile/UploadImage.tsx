'use client'

import * as React from "react"
import { UploadIcon } from "lucide-react"
import Image from "next/image"

interface UploadImageProps {
  onImageUpload: (base64Image: string) => void;
}

export default function UploadImage({ onImageUpload }: UploadImageProps) {
  const [isDragging, setIsDragging] = React.useState(false)
  const [uploadedImage, setUploadedImage] = React.useState<string | null>(null)
  const inputRef = React.useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleClick = () => {
    inputRef.current?.click()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const handleFile = (file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      if (e.target?.result) {
        const base64Image = e.target.result as string
        setUploadedImage(base64Image)
        onImageUpload(base64Image)
      }
    }
    reader.readAsDataURL(file)
  }

  return (
    <div
      onClick={handleClick}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`
        relative flex h-40 w-40 cursor-pointer flex-col items-center justify-center
        rounded-full bg-muted transition-colors overflow-hidden
        ${isDragging ? 'border-2 border-dashed border-primary' : ''}
      `}
    >
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        onChange={handleChange}
        accept="image/*"
      />
      {uploadedImage ? (
        <Image
          src={uploadedImage}
          alt="Uploaded image"
          fill
          sizes="160px"
          className="object-cover rounded-full"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-background">
            <UploadIcon className="h-5 w-5" />
          </div>
        </div>
      )}
    </div>
  )
}