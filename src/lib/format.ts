const chf = new Intl.NumberFormat("de-CH", { style: "currency", currency: "CHF" })

/** 1234.5 -> "CHF 1’234.50" (Swiss formatting). */
export function formatCHF(amount: number): string {
  return chf.format(amount)
}

/** 150 -> "2 h 30 min", 45 -> "45 min", 120 -> "2 h". */
export function formatMinutes(minutes: number): string {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  if (h === 0) return `${m} min`
  if (m === 0) return `${h} h`
  return `${h} h ${m} min`
}
