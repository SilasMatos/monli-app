import { Wallet } from 'lucide-react'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { formatCurrency } from '@/lib/utils/currency'

interface WalletData {
  totalNetWorth: number
  availableBalance: number
  savedBalance: number
}

interface WalletCardProps {
  data: WalletData
}

export function WalletCard({ data }: WalletCardProps) {
  return (
    <Card className="md:col-span-2">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Patrimônio Líquido
            </p>
            <div className="text-4xl font-bold mt-2">
              {formatCurrency(data.totalNetWorth)}
            </div>
          </div>
          <div className="p-3 bg-primary/10 rounded-lg">
            <Wallet className="w-6 h-6 text-primary" />
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-muted/50">
            <p className="text-xs text-muted-foreground mb-1">
              Saldo Disponível
            </p>
            <p className="text-xl font-semibold">
              {formatCurrency(data.availableBalance)}
            </p>
          </div>
          <div className="p-4 rounded-lg bg-muted/50">
            <p className="text-xs text-muted-foreground mb-1">
              Investimentos/Guardado
            </p>
            <p className="text-xl font-semibold">
              {formatCurrency(data.savedBalance)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
