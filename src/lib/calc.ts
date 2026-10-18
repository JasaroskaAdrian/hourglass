/** Round worked time up to the next block of this many minutes. */
export type Rounding = "none" | "15" | "30"

export type JobTotalInput = {
  /** Start time of day, "HH:mm" (24h). */
  start: string
  /** End time of day, "HH:mm". If earlier than start, the job ends the next day. */
  end: string
  driveMinutes: number
  /** CHF per hour of interpreting. */
  hourlyRate: number
  /** CHF per hour of driving (may equal hourlyRate). */
  driveRate: number
  /** Bill at least this many minutes of work (e.g. 60 for a 1-hour minimum). */
  minimumMinutes?: number
  rounding?: Rounding
}

export type JobTotal = {
  /** Actual time between start and end. */
  workedMinutes: number
  /** Worked time after rounding and minimum duration. */
  billedMinutes: number
  driveMinutes: number
  /** All amounts in CHF, rounded to the cent. */
  workAmount: number
  driveAmount: number
  total: number
}

const MINUTES_PER_DAY = 24 * 60

/** "08:30" -> 510. Throws on malformed input so bad data never reaches an invoice. */
export function parseTime(time: string): number {
  const match = /^(\d{1,2}):(\d{2})$/.exec(time)
  if (!match) throw new Error(`Invalid time: "${time}"`)
  const hours = Number(match[1])
  const minutes = Number(match[2])
  if (hours > 23 || minutes > 59) throw new Error(`Invalid time: "${time}"`)
  return hours * 60 + minutes
}

/** Minutes from start to end; wraps past midnight when end < start. */
export function durationMinutes(start: string, end: string): number {
  const diff = parseTime(end) - parseTime(start)
  return diff < 0 ? diff + MINUTES_PER_DAY : diff
}

export function roundUpMinutes(minutes: number, rounding: Rounding): number {
  if (rounding === "none") return minutes
  const block = Number(rounding)
  return Math.ceil(minutes / block) * block
}

/** Money is computed in Rappen (integer cents) to avoid floating-point drift. */
function amountInRappen(minutes: number, ratePerHour: number): number {
  return Math.round((minutes * ratePerHour * 100) / 60)
}

export function calculateJobTotal(input: JobTotalInput): JobTotal {
  const { driveMinutes, hourlyRate, driveRate } = input
  const rounding = input.rounding ?? "none"
  const minimumMinutes = input.minimumMinutes ?? 0

  if (driveMinutes < 0 || hourlyRate < 0 || driveRate < 0 || minimumMinutes < 0) {
    throw new Error("Drive time, rates and minimum duration must not be negative")
  }

  const workedMinutes = durationMinutes(input.start, input.end)
  const billedMinutes = Math.max(roundUpMinutes(workedMinutes, rounding), minimumMinutes)

  const workRappen = amountInRappen(billedMinutes, hourlyRate)
  const driveRappen = amountInRappen(driveMinutes, driveRate)

  return {
    workedMinutes,
    billedMinutes,
    driveMinutes,
    workAmount: workRappen / 100,
    driveAmount: driveRappen / 100,
    total: (workRappen + driveRappen) / 100,
  }
}
