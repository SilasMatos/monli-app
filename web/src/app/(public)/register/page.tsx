import { GalleryVerticalEnd } from 'lucide-react'
import { LanguageSwitcher } from '@/components/language-switcher'
import { RegisterForm } from '@/components/register-form'

export default function Register() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="absolute top-6 right-6 z-10 flex items-center justify-end">
        <LanguageSwitcher />
      </div>
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <GalleryVerticalEnd className="size-4" />
          </div>
          Monli
        </a>
        <RegisterForm />
      </div>
    </div>
  )
}
