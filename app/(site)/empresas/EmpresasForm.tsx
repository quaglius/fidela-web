'use client'
export default function EmpresasForm() {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const nombre = (form.elements.namedItem('nombre') as HTMLInputElement)?.value ?? ''
    const empresa = (form.elements.namedItem('empresa') as HTMLInputElement)?.value ?? ''
    const cantidad = (form.elements.namedItem('cantidad') as HTMLInputElement)?.value ?? ''
    const mensaje = (form.elements.namedItem('mensaje') as HTMLTextAreaElement)?.value ?? ''
    const text = encodeURIComponent(
      `Hola Fidela! Me llamo ${nombre} de ${empresa}. Quiero consultar por ${cantidad} unidades aprox. ${mensaje}`
    )
    window.open(`https://wa.me/5491163369052?text=${text}`, '_blank')
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs tracking-widest uppercase text-[var(--gray-400)]">Nombre</label>
          <input name="nombre" required className="border border-[var(--gray-200)] rounded px-4 py-3 text-sm focus:outline-none focus:border-[var(--gold)]" placeholder="Tu nombre" />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs tracking-widest uppercase text-[var(--gray-400)]">Empresa</label>
          <input name="empresa" required className="border border-[var(--gray-200)] rounded px-4 py-3 text-sm focus:outline-none focus:border-[var(--gold)]" placeholder="Nombre de la empresa" />
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-xs tracking-widest uppercase text-[var(--gray-400)]">Cantidad estimada</label>
        <input name="cantidad" className="border border-[var(--gray-200)] rounded px-4 py-3 text-sm focus:outline-none focus:border-[var(--gold)]" placeholder="Ej: 50 boxes" />
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-xs tracking-widest uppercase text-[var(--gray-400)]">Mensaje</label>
        <textarea name="mensaje" rows={4} className="border border-[var(--gray-200)] rounded px-4 py-3 text-sm focus:outline-none focus:border-[var(--gold)] resize-none" placeholder="Contanos qué estás buscando..." />
      </div>
      <button type="submit" className="btn-gold py-4 text-sm tracking-widest uppercase rounded">
        Enviar por WhatsApp
      </button>
    </form>
  )
}
