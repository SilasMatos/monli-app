import { ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { formatCurrency, formatDate } from '@/lib/utils/currency'

interface Transaction {
  id: string
  type: 'income' | 'expense'
  category: string
  description: string
  amount: number
  date: string
}

interface TransactionsCardProps {
  transactions: Transaction[]
}

export function TransactionsCard({ transactions }: TransactionsCardProps) {
  return (
    <Card className="md:col-span-2">
      <CardHeader>
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-medium text-muted-foreground">
            Transações Recentes
          </h3>
          <button className="text-xs text-primary hover:underline flex items-center gap-1">
            Ver todas <ArrowUpRight className="w-3 h-3" />
          </button>
        </div>
      </CardHeader>

      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-xs text-muted-foreground border-b">
                <th className="pb-3 font-medium pl-2">Descrição</th>
                <th className="pb-3 font-medium hidden sm:table-cell">
                  Categoria
                </th>
                <th className="pb-3 font-medium hidden sm:table-cell">Data</th>
                <th className="pb-3 font-medium text-right pr-2">Valor</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {transactions.map(tx => (
                <tr
                  key={tx.id}
                  className="border-b last:border-0 hover:bg-muted/50 transition-colors"
                >
                  <td className="py-4 pl-2">
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-md ${
                          tx.type === 'income'
                            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                            : 'bg-rose-500/10 text-rose-600 dark:text-rose-400'
                        }`}
                      >
                        {tx.type === 'income' ? (
                          <ArrowDownRight className="w-4 h-4" />
                        ) : (
                          <ArrowUpRight className="w-4 h-4" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{tx.description}</p>
                        <p className="text-xs text-muted-foreground sm:hidden">
                          {formatDate(tx.date)}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 hidden sm:table-cell text-muted-foreground">
                    {tx.category}
                  </td>
                  <td className="py-4 hidden sm:table-cell text-muted-foreground">
                    {formatDate(tx.date)}
                  </td>
                  <td
                    className={`py-4 pr-2 text-right font-semibold ${
                      tx.type === 'income'
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : 'text-rose-600 dark:text-rose-400'
                    }`}
                  >
                    {formatCurrency(tx.amount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
