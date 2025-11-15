'use client'

import { Control } from 'react-hook-form'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormDescription
} from '@/components/ui/form'
import { WelcomeFormData } from '@/schemas/welcome-schema'

interface StepNotificationsProps {
  control: Control<WelcomeFormData>
}

export function StepNotifications({ control }: StepNotificationsProps) {
  return (
    <div className="space-y-6">
      <FormField
        control={control}
        name="notifications"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <FormLabel className="text-base">Notificações Push</FormLabel>
              <FormDescription>
                Receba notificações no seu dispositivo
              </FormDescription>
            </div>
            <FormControl>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="emailNotifications"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <FormLabel className="text-base">
                Notificações por Email
              </FormLabel>
              <FormDescription>
                Receba atualizações importantes por email
              </FormDescription>
            </div>
            <FormControl>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  )
}
