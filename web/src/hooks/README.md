# React Query Hooks Documentation

Hooks customizados para gerenciar estado assíncrono com React Query.

## Estrutura

```
hooks/
├── mutations/        # Hooks para mutations (POST, PUT, DELETE, PATCH)
│   ├── use-auth-mutations.ts
│   ├── use-wallet-mutations.ts
│   ├── use-profile-mutations.ts
│   ├── use-credit-card-mutations.ts
│   ├── use-budget-mutations.ts
│   ├── use-subscription-mutations.ts
│   └── index.ts
└── queries/          # Hooks para queries (GET)
    ├── use-auth-queries.ts
    ├── use-wallet-queries.ts
    ├── use-profile-queries.ts
    ├── use-credit-card-queries.ts
    ├── use-budget-queries.ts
    ├── use-subscription-queries.ts
    └── index.ts
```

## Uso

### Mutations:

```typescript
import { useLogin, useCreateTransaction } from '@/hooks/mutations'

const { mutate: login, isPending } = useLogin({
  onSuccess: data => {
    console.log('Login successful', data)
  },
  onError: error => {
    console.error('Login failed', error)
  }
})

login({ email: 'user@example.com', password: 'password123' })
```

### Queries:

```typescript
import { useWallet, useBudgets } from '@/hooks/queries'

const { data: wallet, isLoading } = useWallet()
const { data: budgets } = useBudgets()
```

## Recursos

- Validação automática com Zod
- Tipos TypeScript inferidos
- Cache otimizado
- Invalidação automática
- Loading e error states
