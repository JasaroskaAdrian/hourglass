export type JobStatus = "open" | "invoiced" | "paid"

export type Job = {
  id: string
  name: string
  /** Calendar date, "yyyy-MM-dd". */
  date: string
  /** Times of day, "HH:mm". */
  start: string
  end: string
  client: string
  driveMinutes: number
  /** CHF per hour. */
  hourlyRate: number
  driveRate: number
  status: JobStatus
}
