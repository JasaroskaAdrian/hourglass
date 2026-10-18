import { format, parseISO } from "date-fns"
import type { Job } from "@/types/job"

export type MonthGroup = {
  /** "2026-10", stable key for React lists. */
  key: string
  /** "October 2026". */
  label: string
  jobs: Job[]
}

/** Groups jobs by month, newest month first; jobs inside a month sorted by date and start time. */
export function groupJobsByMonth(jobs: Job[]): MonthGroup[] {
  const sorted = [...jobs].sort(
    (a, b) => a.date.localeCompare(b.date) || a.start.localeCompare(b.start),
  )
  const groups = new Map<string, MonthGroup>()
  for (const job of sorted) {
    const key = job.date.slice(0, 7)
    let group = groups.get(key)
    if (!group) {
      group = { key, label: format(parseISO(job.date), "MMMM yyyy"), jobs: [] }
      groups.set(key, group)
    }
    group.jobs.push(job)
  }
  return [...groups.values()].sort((a, b) => b.key.localeCompare(a.key))
}
