import './globals.css'
import { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import { cookies } from 'next/headers'
import ReactQueryProvider from '@/providers/react-query-provider'
import { NextIntlClientProvider } from 'next-intl'
import { ThemeProvider } from '@/providers/theme-provider'
import { Toaster } from 'sonner'

export const metadata: Metadata = {
  title: 'Template Auth Next.js',
  description: 'A simple authentication template using Next.js and Tailwind CSS'
}

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700']
})

export default async function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  const cookieStore = cookies()
  const locale = (await cookieStore).get('locale')?.value || 'pt'

  let messages
  try {
    messages = (await import(`../messages/${locale}.json`)).default
  } catch (error) {
    messages = (await import('../messages/pt.json')).default
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <head />
      <body cz-shortcut-listen="true" className={poppins.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider
            locale={locale}
            messages={messages}
            timeZone="America/Sao_Paulo"
          >
            <ReactQueryProvider>
              {children}
              <Toaster position="top-right" />
            </ReactQueryProvider>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
