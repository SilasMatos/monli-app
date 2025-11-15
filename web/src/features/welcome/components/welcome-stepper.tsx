'use client'

import { Settings, Bell, Shield, User, Check } from 'lucide-react'

interface Step {
  id: number
  title: string
  description: string
  icon: any
}

interface WelcomeStepperProps {
  currentStep: number
  steps: Step[]
}

export function WelcomeStepper({ currentStep, steps }: WelcomeStepperProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      {steps.map((step, index) => {
        const Icon = step.icon
        const isActive = currentStep === step.id
        const isCompleted = currentStep > step.id

        return (
          <div key={step.id} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-colors ${
                  isCompleted
                    ? 'bg-foreground border-foreground text-background'
                    : isActive
                    ? 'bg-primary border-primary text-primary-foreground'
                    : 'bg-background border-border text-muted-foreground'
                }`}
              >
                {isCompleted ? (
                  <Check className="w-6 h-6" />
                ) : (
                  <Icon className="w-6 h-6" />
                )}
              </div>
              <div className="mt-2 text-center">
                <p
                  className={`text-sm font-medium ${
                    isActive ? 'text-foreground' : 'text-muted-foreground'
                  }`}
                >
                  {step.title}
                </p>
              </div>
            </div>

            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-0.5 mx-4 ${
                  currentStep > step.id ? 'bg-foreground' : 'bg-border'
                }`}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
