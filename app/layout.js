import { Roboto } from 'next/font/google'
import './styles/globals.css'

const roboto = Roboto({ subsets: ['latin'], weight: '100' })

export const metadata = {
  title: 'Mark Nalley',
  description: 'Mark Nalley',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>{children}</body>
    </html>
  )
}
