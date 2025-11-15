'use client'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useTranslations } from 'next-intl'

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const t = useTranslations('auth')

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">{t('createAccount')}</CardTitle>
          <CardDescription>{t('signUpWithSocial')}</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid gap-6">
              <div className="flex flex-col gap-4"></div>

              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="name">{t('fullName')}</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder={t('namePlaceholder')}
                    required
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="email">{t('email')}</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={t('emailPlaceholder')}
                    required
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="cpf">{t('cpf')}</Label>
                  <Input
                    id="cpf"
                    type="text"
                    placeholder={t('cpfPlaceholder')}
                    required
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="password">{t('password')}</Label>
                  <Input id="password" type="password" required />
                </div>
                <Button type="submit" className="w-full">
                  {t('createAccountButton')}
                </Button>
              </div>
              <div className="text-center text-sm">
                {t('alreadyHaveAccount')}{' '}
                <Link href="login" className="underline underline-offset-4">
                  {t('signIn')}
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        {t('termsAndConditions')} <a href="#">{t('termsOfService')}</a>{' '}
        {t('and')} <a href="#">{t('privacyPolicy')}</a>.
      </div>
    </div>
  )
}
