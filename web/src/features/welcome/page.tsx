'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Form } from '@/components/ui/form'
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Settings,
  Bell,
  Shield,
  User
} from 'lucide-react'

import { welcomeSchema, WelcomeFormData } from '@/schemas/welcome-schema'
import { useCreateAccount } from '@/hooks/use-mutation'
import { WelcomeStepper } from './components/welcome-stepper'
import { StepBasicSettings } from './components/step-basic-settings'
import { StepNotifications } from './components/step-notifications'
import { StepSecurity } from './components/step-security'
import { StepProfile } from './components/step-profile'

const steps = [
  {
    id: 1,
    title: 'Configurações Básicas',
    description: 'Configure suas preferências iniciais',
    icon: Settings
  },
  {
    id: 2,
    title: 'Notificações',
    description: 'Personalize suas notificações',
    icon: Bell
  },
  {
    id: 3,
    title: 'Segurança',
    description: 'Configure a segurança da sua conta',
    icon: Shield
  },
  {
    id: 4,
    title: 'Perfil',
    description: 'Adicione sua foto de perfil',
    icon: User
  }
]

export default function WelcomeScreen() {
  const [currentStep, setCurrentStep] = useState(1)

  const form = useForm<WelcomeFormData>({
    resolver: zodResolver(welcomeSchema),
    mode: 'onChange',
    defaultValues: {
      initialBalance: '',
      theme: 'light',
      language: 'pt-BR',
      currency: 'BRL',
      notifications: true,
      emailNotifications: true,
      twoFactorEnabled: false,
      avatar: ''
    }
  })

  const createAccountMutation = useCreateAccount({
    onSuccess: () => {
      // Sucesso é tratado automaticamente no hook
    },
    onError: error => {
      console.error('Erro ao criar conta:', error)
    }
  })

  const nextStep = async () => {
    let fieldsToValidate: (keyof WelcomeFormData)[] = []

    switch (currentStep) {
      case 1:
        fieldsToValidate = ['initialBalance', 'theme', 'language', 'currency']
        break
      case 2:
        fieldsToValidate = ['notifications', 'emailNotifications']
        break
      case 3:
        fieldsToValidate = ['twoFactorEnabled']
        break
      case 4:
        fieldsToValidate = ['avatar']
        break
    }

    const isValid = await form.trigger(fieldsToValidate)

    if (isValid && currentStep < steps.length) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const onSubmit = async (data: WelcomeFormData) => {
    try {
      const payload = {
        ...data,
        initialBalance: Number(data.initialBalance)
      }

      await createAccountMutation.mutateAsync(payload)
    } catch (error) {
      console.error('Erro no submit:', error)
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <StepBasicSettings control={form.control} />
      case 2:
        return <StepNotifications control={form.control} />
      case 3:
        return <StepSecurity control={form.control} />
      case 4:
        return <StepProfile control={form.control} />
      default:
        return null
    }
  }

  const isLastStep = currentStep === steps.length
  const isFirstStep = currentStep === 1

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Bem-vindo! 👋
          </h1>
          <p className="text-muted-foreground">
            Vamos configurar sua conta em alguns passos simples
          </p>
        </div>
        <WelcomeStepper currentStep={currentStep} steps={steps} />\
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {React.createElement(steps[currentStep - 1].icon, {
                    className: 'w-5 h-5'
                  })}
                  {steps[currentStep - 1].title}
                </CardTitle>
                <CardDescription>
                  {steps[currentStep - 1].description}
                </CardDescription>
              </CardHeader>
              <CardContent>{renderStepContent()}</CardContent>
            </Card>

            <div className="flex justify-between items-center">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={isFirstStep}
                className="flex items-center gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                Anterior
              </Button>

              <Badge variant="secondary" className="px-3 py-1">
                {currentStep} de {steps.length}
              </Badge>

              {isLastStep ? (
                <Button
                  type="submit"
                  disabled={createAccountMutation.isPending}
                  className="flex items-center gap-2"
                >
                  {createAccountMutation.isPending ? (
                    <>
                      <div className="w-4 h-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      Criando...
                    </>
                  ) : (
                    <>
                      Finalizar
                      <Check className="w-4 h-4" />
                    </>
                  )}
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={nextStep}
                  className="flex items-center gap-2"
                >
                  Próximo
                  <ChevronRight className="w-4 h-4" />
                </Button>
              )}
            </div>
          </form>
        </Form>
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-8 p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Debug Info:</h3>
            <p className="text-sm">Step atual: {currentStep}</p>
            <p className="text-sm">
              Form válido: {form.formState.isValid ? 'Sim' : 'Não'}
            </p>
            <p className="text-sm">
              Erros: {Object.keys(form.formState.errors).length}
            </p>
            {Object.keys(form.formState.errors).length > 0 && (
              <pre className="text-xs mt-2 overflow-auto">
                {JSON.stringify(form.formState.errors, null, 2)}
              </pre>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
