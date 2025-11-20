import { AlertTriangle } from 'lucide-react'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { ProgressBar, Badge } from '@/components/ui/common'
import { formatCurrency } from '@/lib/utils/currency'

interface BudgetData {
  totalBudgeted: number
  totalSpent: number
  spendingPercentage: number
  status: 'warning' | 'normal'
}

interface BudgetCardProps {
  data: BudgetData
}

export function BudgetCard({ data }: BudgetCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-medium text-muted-foreground">
            Orçamento
          </h3>
          {data.status === 'warning' && (
            <Badge variant="warning">
              <AlertTriangle className="w-3 h-3" /> Atenção
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col items-center justify-center py-2">
          <div className="text-3xl font-bold mb-1">
            {data.spendingPercentage}%
          </div>
          <p className="text-xs text-muted-foreground">
            do limite mensal utilizado
          </p>
        </div>

        <div className="mt-6 space-y-3">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">
              Gasto: {formatCurrency(data.totalSpent)}
            </span>
            <span className="text-muted-foreground">
              Total: {formatCurrency(data.totalBudgeted)}
            </span>
          </div>
          <ProgressBar
            value={data.spendingPercentage}
            variant={data.spendingPercentage > 70 ? 'destructive' : 'default'}
          />
        </div>
      </CardContent>
    </Card>
  )
}
