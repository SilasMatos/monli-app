'use client'

import { useState } from 'react'
import { Control } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Upload, User } from 'lucide-react'
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form'
import { WelcomeFormData } from '@/schemas/welcome-schema'

interface StepProfileProps {
  control: Control<WelcomeFormData>
}

export function StepProfile({ control }: StepProfileProps) {
  const [previewUrl, setPreviewUrl] = useState<string>('')

  const handleFileUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    onChange: (value: string) => void
  ) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const result = reader.result as string
        setPreviewUrl(result)
        onChange(result)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="space-y-6">
      <FormField
        control={control}
        name="avatar"
        render={({ field }) => (
          <FormItem>
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="w-24 h-24">
                <AvatarImage
                  src={previewUrl || field.value || '/placeholder.svg'}
                />
                <AvatarFallback>
                  <User className="w-12 h-12" />
                </AvatarFallback>
              </Avatar>

              <FormControl>
                <div className="w-full">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={e => handleFileUpload(e, field.onChange)}
                    className="hidden"
                    id="avatar-upload"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() =>
                      document.getElementById('avatar-upload')?.click()
                    }
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Fazer Upload da Foto
                  </Button>
                </div>
              </FormControl>

              <p className="text-sm text-muted-foreground text-center">
                Adicione uma foto de perfil para personalizar sua conta
              </p>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}
