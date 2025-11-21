import React from 'react'
import DotGrid from '@/components/ui/dot-grid'
import { LoginForm } from '@/components/login-form'

function AuthPage() {
  return (
    <div className="h-screen flex items-center w-full">
      <div className="w-1/2 bg-black h-full relative flex items-center justify-center">
        <DotGrid
          dotSize={3}
          gap={20}
          baseColor="#464646"
          activeColor="#848386"
          proximity={120}
          shockRadius={250}
          shockStrength={5}
          resistance={750}
          returnDuration={1.5}
        />
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div>
            <h4 className="text-4xl font-bold text-white">Monli</h4>

            <h1>Sistema de gerenciamento e organizacao pessoal</h1>
          </div>
        </div>
      </div>
      <div className="w-1/2 h-full flex items-center justify-center">
        <LoginForm />
      </div>
    </div>
  )
}

export default AuthPage
