import { CreditCard } from 'lucide-react'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { formatCurrency } from '@/lib/utils/currency'

interface CreditCardData {
  id: string
  name: string
  brand: string
  lastFourDigits: string
  dueDay: number
  creditInfo: {
    limit: number
    used: number
    available: number
  }
}

interface CreditCardsCardProps {
  cards: CreditCardData[]
}

export function CreditCardsCard({ cards }: CreditCardsCardProps) {
  return (
    <Card className="md:col-span-2">
      <CardHeader>
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-medium text-muted-foreground">
            Cartões de Crédito
          </h3>
          <CreditCard className="w-4 h-4 text-muted-foreground" />
        </div>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {cards.map(card => {
            const usagePercentage =
              (card.creditInfo.used / card.creditInfo.limit) * 100

            return (
              <div
                key={card.id}
                className="rounded-lg border bg-card p-5 hover:bg-muted/50 transition-colors"
              >
                <div className="flex flex-col h-full justify-between gap-6">
                  <div className="flex justify-between items-start">
                    <span className="font-bold tracking-wider">
                      {card.name}
                    </span>
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                      {card.brand}
                    </span>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-muted-foreground mb-2">
                      <span>•••• {card.lastFourDigits}</span>
                      <span>Vence dia {card.dueDay}</span>
                    </div>
                    <div className="h-2 w-full bg-secondary rounded-full overflow-hidden mb-2">
                      <div
                        className="h-full bg-primary transition-all"
                        style={{ width: `${usagePercentage}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="font-medium">
                        {formatCurrency(card.creditInfo.used)}
                      </span>
                      <span className="text-muted-foreground">
                        {formatCurrency(card.creditInfo.available)} Disp.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
