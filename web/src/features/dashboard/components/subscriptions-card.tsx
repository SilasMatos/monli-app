import { Calendar, Music, Tv } from 'lucide-react'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { formatCurrency } from '@/lib/utils/currency'

interface Subscription {
  id: string
  name: string
  amount: number
  daysRemaining: number
  icon: string
  color: string
}

interface SubscriptionsData {
  monthlyTotal: number
  upcoming: Subscription[]
}

interface SubscriptionsCardProps {
  data: SubscriptionsData
}

export function SubscriptionsCard({ data }: SubscriptionsCardProps) {
  const getIcon = (iconName: string, color: string) => {
    const iconProps = { className: 'w-4 h-4', style: { color } }

    switch (iconName) {
      case 'netflix':
        return <Tv {...iconProps} />
      case 'spotify':
        return <Music {...iconProps} />
      default:
        return <Music {...iconProps} />
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-medium text-muted-foreground">
            Assinaturas
          </h3>
          <Calendar className="w-4 h-4 text-muted-foreground" />
        </div>
      </CardHeader>

      <CardContent>
        <div className="mb-4">
          <p className="text-xs text-muted-foreground">Total Mensal</p>
          <p className="text-2xl font-bold">
            {formatCurrency(data.monthlyTotal)}
          </p>
        </div>

        <div className="space-y-3">
          {data.upcoming.map(sub => (
            <div
              key={sub.id}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-md flex items-center justify-center"
                  style={{ backgroundColor: `${sub.color}20` }}
                >
                  {getIcon(sub.icon, sub.color)}
                </div>
                <div>
                  <p className="text-sm font-medium">{sub.name}</p>
                  <p className="text-xs text-muted-foreground">
                    Vence em {sub.daysRemaining} dias
                  </p>
                </div>
              </div>
              <span className="text-sm font-semibold">
                {formatCurrency(sub.amount)}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
