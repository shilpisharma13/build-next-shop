import HeaderSection from '@/components/HeaderSection'
import './globals.css'
import { Inter } from 'next/font/google'
import { ShopProvider } from '../context/shopContext'
import Providers from '@/lib/providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Shoes Store',
  description: 'One stop shop for shoes',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <html lang='en'>
        <body className={inter.className}>
          <Providers>
            <ShopProvider>
              <HeaderSection />
              {children}
            </ShopProvider>
          </Providers>
        </body>
      </html>
    </>
  )
}
