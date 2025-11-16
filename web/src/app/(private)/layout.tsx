import Sidebar from '@/components/sidebar-app'
import AppHeader from '@/components/app-header'
import { ThemeProvider } from '@/contexts/theme-context'
import { SidebarProvider } from '@/contexts/sidebar-context'

export default function PrivateLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider>
      <SidebarProvider>
        <div className="flex h-screen text-white">
          <Sidebar />
          <div className="flex-1 flex flex-col overflow-hidden">
            <AppHeader />
            <main className="flex-1 overflow-auto">{children}</main>
          </div>
        </div>
      </SidebarProvider>
    </ThemeProvider>
  )
}
