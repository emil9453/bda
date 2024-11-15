'use client'

import * as React from "react"
import { UploadIcon, XIcon } from 'lucide-react'
import Image from "next/image"
import { Button } from "@/components/ui/button"

interface UploadImageProps {
  onImageUpload: (file: File | null) => void;
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
    const imageUrl = URL.createObjectURL(file)
    setUploadedImage(imageUrl)
    onImageUpload(file)
  }

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent triggering handleClick
    setUploadedImage(null)
    if (inputRef.current) {
      inputRef.current.value = ''
    }
    onImageUpload(null)
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
        <>
          <Image
            src={uploadedImage}
            alt="Uploaded image"
            fill
            sizes="160px"
            className="object-cover rounded-full"
          />
          <Button
            variant="destructive"
            size="icon"
            className="absolute top-0 right-0 m-2 rounded-full"
            onClick={handleDelete}
            aria-label="Delete uploaded image"
          >
            <XIcon className="h-4 w-4" />
          </Button>
        </>
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