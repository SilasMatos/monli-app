'use client'

import { Control, useWatch } from 'react-hook-form'
import { Switch } from '@/components/ui/switch'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormDescription
} from '@/components/ui/form'
import { WelcomeFormData } from '@/schemas/welcome-schema'

interface StepSecurityProps {
  control: Control<WelcomeFormData>
}

export function StepSecurity({ control }: StepSecurityProps) {
  const twoFactorEnabled = useWatch({
    control,
    name: 'twoFactorEnabled'
  })

  return (
    <div className="space-y-6">
      <FormField
        control={control}
        name="twoFactorEnabled"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <FormLabel className="text-base">
                Autenticação de Dois Fatores
              </FormLabel>
              <FormDescription>
                Adicione uma camada extra de segurança à sua conta
              </FormDescription>
            </div>
            <FormControl>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
          </FormItem>
        )}
      />

      {twoFactorEnabled && (
        <div className="p-4 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground">
            A autenticação de dois fatores será configurada após o cadastro
            inicial.
          </p>
        </div>
      )}
    </div>
  )
}
