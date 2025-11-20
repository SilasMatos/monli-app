export const formatCurrency = (value: number, currency = 'BRL') => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency
  }).format(value)
}

export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short'
  })
}

export const formatPercentage = (value: number, decimals = 1) => {
  return `${value.toFixed(decimals)}%`
}