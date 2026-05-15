'use client'
import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { TNImage } from '@/lib/tiendanube'

interface Props {
  images: TNImage[]
  productName: string
}

export default function ProductGallery({ images: allImages, productName }: Props) {
  // TN products typically store a valid product photo only as the first image.
  // Secondary images often contain watermarked/Pinterest content — show only the first.
  const images = allImages.slice(0, 1)
  const [activeIdx, setActiveIdx] = useState(0)

  if (images.length === 0) {
    return (
      <div className="aspect-square bg-[var(--cream)] rounded-lg flex items-center justify-center">
        <span className="text-[var(--gray-400)] text-sm">Sin imagen</span>
      </div>
    )
  }

  const active = images[activeIdx]

  function prev() { setActiveIdx((i) => (i - 1 + images.length) % images.length) }
  function next() { setActiveIdx((i) => (i + 1) % images.length) }

  return (
    <div className="flex gap-3">
      {/* Thumbnails — visible en desktop */}
      {images.length > 1 && (
        <div className="hidden md:flex flex-col gap-2 w-[72px] flex-shrink-0">
          {images.slice(0, 6).map((img, i) => (
            <button
              key={img.id}
              onClick={() => setActiveIdx(i)}
              className={`relative aspect-square rounded overflow-hidden border-2 transition-all duration-150 flex-shrink-0 ${
                i === activeIdx
                  ? 'border-[var(--black)] opacity-100'
                  : 'border-transparent opacity-60 hover:opacity-90'
              }`}
            >
              <Image
                src={img.src}
                alt={`${productName} ${i + 1}`}
                fill
                className="object-cover"
                sizes="72px"
              />
            </button>
          ))}
        </div>
      )}

      {/* Imagen principal */}
      <div className="flex-1 relative">
        <div className="relative aspect-square bg-[var(--cream)] rounded-lg overflow-hidden group">
          <Image
            src={active.src}
            alt={`${productName} — imagen ${activeIdx + 1}`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />

          {/* Flechas mobile */}
          {images.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1.5 shadow-sm md:hidden transition-opacity"
                aria-label="Imagen anterior"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={next}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1.5 shadow-sm md:hidden transition-opacity"
                aria-label="Imagen siguiente"
              >
                <ChevronRight size={18} />
              </button>
            </>
          )}
        </div>

        {/* Dots indicator mobile */}
        {images.length > 1 && (
          <div className="flex justify-center gap-1.5 mt-3 md:hidden">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIdx(i)}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  i === activeIdx ? 'bg-[var(--black)] w-4' : 'bg-[var(--gray-400)]'
                }`}
                aria-label={`Imagen ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
