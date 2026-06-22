export function formatDate(value?: string | Date | null): string {
  if (!value) return ''
  const d = new Date(value as string)
  if (isNaN(d.getTime())) return ''
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export default formatDate
