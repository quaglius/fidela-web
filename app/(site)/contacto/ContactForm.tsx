'use client'
export default function ContactForm() {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const nombre = (form.elements.namedItem('nombre') as HTMLInputElement)?.value ?? ''
    const mensaje = (form.elements.namedItem('mensaje') as HTMLTextAreaElement)?.value ?? ''
    const text = encodeURIComponent(`Hola Fidela, soy ${nombre}. ${mensaje}`)
    window.open(`https://wa.me/5491163369052?text=${text}`, '_blank')
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-1.5">
        <label className="text-xs tracking-widest uppercase text-[var(--gray-400)]">Nombre</label>
        <input
          name="nombre"
          required
          className="border border-[var(--gray-200)] rounded px-4 py-3 text-sm focus:outline-none focus:border-[var(--gold)]"
          placeholder="Tu nombre"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-xs tracking-widest uppercase text-[var(--gray-400)]">Mensaje</label>
        <textarea
          name="mensaje"
          rows={5}
          required
          className="border border-[var(--gray-200)] rounded px-4 py-3 text-sm focus:outline-none focus:border-[var(--gold)] resize-none"
          placeholder="¿En qué podemos ayudarte?"
        />
      </div>
      <button type="submit" className="btn-gold py-4 text-sm tracking-widest uppercase rounded">
        Enviar por WhatsApp
      </button>
    </form>
  )
}
