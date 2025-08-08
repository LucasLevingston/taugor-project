import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/pt-br'

dayjs.extend(relativeTime)
dayjs.locale('pt-br')

export function fromNow(date: Date | string | null | undefined) {
  return dayjs(date).fromNow()
}

export function formatDate(date: Date | string | null | undefined) {
  return dayjs(date).format('DD/MM/YYYY')
}

export function formatCurrency(
  value: number | undefined,
  currency = 'BRL',
  locale = 'pt-BR'
): string {
  if (value === undefined || value === null) return 'N/A'
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(value)
}
