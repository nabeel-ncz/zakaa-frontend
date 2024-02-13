import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import ReduxProvider from '@/store/provider';
import { Toaster } from 'react-hot-toast';
import './globals.css'

const inter = Inter({
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'Zakaa',
  description: 'Zakaa the learning platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster />
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  )
}
