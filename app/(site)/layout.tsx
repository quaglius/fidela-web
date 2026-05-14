import Navbar from '@/components/site/Navbar'
import Footer from '@/components/site/Footer'
import CartDrawer from '@/components/site/CartDrawer'
import { supabase } from '@/lib/supabase'

async function getAnnouncement(): Promise<string | undefined> {
  try {
    const { data } = await supabase
      .from('site_config')
      .select('value')
      .eq('key', 'announcement_bar')
      .single()
    return data?.value ?? undefined
  } catch {
    return undefined
  }
}

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const announcement = await getAnnouncement()

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar announcement={announcement} />
      <CartDrawer />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
