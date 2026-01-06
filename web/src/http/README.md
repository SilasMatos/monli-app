# HTTP Layer Documentation

Esta camada contém toda a lógica de comunicação com a API, organizada de forma modular e desacoplada.

## Estrutura

```
http/
├── api/              # Funções de requisição HTTP
│   ├── auth.api.ts
│   ├── wallet.api.ts
│   ├── profile.api.ts
│   ├── credit-card.api.ts
│   ├── budget.api.ts
│   ├── subscription.api.ts
│   └── index.ts
└── schema/           # Schemas Zod para validação
    ├── auth.schema.ts
    ├── wallet.schema.ts
    ├── profile.schema.ts
    ├── credit-card.schema.ts
    ├── budget.schema.ts
    ├── subscription.schema.ts
    └── index.ts
```

## Uso

### Importar schemas:

```typescript
import { LoginInput, LoginResponse } from '@/http/schema'
```

### Importar APIs:

```typescript
import { authApi } from '@/http/api'
```

### Usar com React Query (recomendado):

```typescript
import { useLogin } from '@/hooks/mutations'
```
