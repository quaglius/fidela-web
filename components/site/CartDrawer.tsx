'use client'
import { useCart } from '@/lib/cart'
import { X, Minus, Plus, ShoppingBag } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { formatPrice } from '@/lib/tiendanube'

export default function CartDrawer() {
  const { items, isOpen, close, removeItem, updateQuantity, total, checkoutUrl } = useCart()

  if (!isOpen) return null

  return (
    <>
      <div className="cart-overlay" onClick={close} />
      <div
        className="fixed right-0 top-0 h-full w-full max-w-sm bg-white z-50 flex flex-col slide-in-right shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <h2 className="text-sm tracking-widest uppercase font-medium">
            Carrito {items.length > 0 && <span className="text-[var(--gray-400)]">({items.length})</span>}
          </h2>
          <button onClick={close} aria-label="Cerrar carrito">
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <ShoppingBag size={48} className="text-[var(--gray-200)]" />
              <p className="text-sm text-[var(--gray-600)]">Tu carrito está vacío</p>
              <Link
                href="/productos"
                className="text-xs tracking-widest uppercase underline hover:text-[var(--gold)]"
                onClick={close}
              >
                Ver productos
              </Link>
            </div>
          ) : (
            <ul className="flex flex-col gap-5">
              {items.map((item) => (
                <li key={item.variantId} className="flex gap-4">
                  {/* Image */}
                  <div className="relative w-20 h-20 bg-[var(--cream)] flex-shrink-0 rounded">
                    {item.image ? (
                      <Image src={item.image} alt={item.productName} fill className="object-cover rounded" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ShoppingBag size={20} className="text-[var(--gray-400)]" />
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium leading-snug truncate">{item.productName}</p>
                    {item.variantName && (
                      <p className="text-xs text-[var(--gray-600)] mt-0.5">{item.variantName}</p>
                    )}
                    <p className="text-sm font-medium text-[var(--gold)] mt-1">
                      {formatPrice(item.price)}
                    </p>

                    {/* Quantity + remove */}
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center border border-gray-200 rounded">
                        <button
                          onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center hover:bg-gray-50"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-8 text-center text-sm">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center hover:bg-gray-50"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.variantId)}
                        className="text-xs text-[var(--gray-400)] hover:text-[var(--error)] underline"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-100 px-6 py-5 flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-[var(--gray-600)]">Subtotal</span>
              <span className="text-base font-medium">{formatPrice(String(total()))}</span>
            </div>
            <p className="text-xs text-[var(--gray-400)] -mt-2">
              Envío y descuentos se calculan en el checkout
            </p>
            <a
              href={checkoutUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold w-full py-4 text-center text-sm tracking-widest uppercase font-medium rounded"
            >
              Finalizar compra
            </a>
            <button
              onClick={close}
              className="text-xs text-center tracking-widest uppercase underline hover:text-[var(--gold)]"
            >
              Seguir comprando
            </button>
          </div>
        )}
      </div>
    </>
  )
}
