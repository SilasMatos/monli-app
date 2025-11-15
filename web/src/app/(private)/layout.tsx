import { Navbar } from '@/components/app-navbar'
import WelcomeScreen from '@/features/welcome/page'
import Sidebar from '@/components/sidebar-app'

export default function PrivateLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <div className="flex h-screen bg-background">
        <Sidebar />
        <main className="flex-1 flex flex-col overflow-hidden">{children}</main>
      </div>
    </>

    // <div className="min-h-screen bg-background">
    //   <>
    //     <Navbar />
    //     <main className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
    //       {children}
    //     </main>
    //     <WelcomeScreen />
    //   </>
    // </div>
  )
}
