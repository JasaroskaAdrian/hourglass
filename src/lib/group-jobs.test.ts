import { describe, expect, it } from "vitest"
import type { Job } from "@/types/job"
import { groupJobsByMonth } from "./group-jobs"

function job(id: string, date: string, start = "09:00"): Job {
  return {
    id, date, start, end: "10:00", name: "Test", client: "Client",
    driveMinutes: 0, hourlyRate: 100, driveRate: 100, status: "open",
  }
}

describe("groupJobsByMonth", () => {
  it("returns no groups for no jobs", () => {
    expect(groupJobsByMonth([])).toEqual([])
  })

  it("groups by month, newest month first, jobs in date order", () => {
    const groups = groupJobsByMonth([
      job("a", "2026-09-30"),
      job("b", "2026-10-15"),
      job("c", "2026-10-02", "14:00"),
      job("d", "2026-10-02", "08:00"),
    ])
    expect(groups.map((g) => g.label)).toEqual(["October 2026", "September 2026"])
    expect(groups[0].jobs.map((j) => j.id)).toEqual(["d", "c", "b"])
  })

  it("keeps the same month of different years apart", () => {
    const groups = groupJobsByMonth([job("a", "2025-10-01"), job("b", "2026-10-01")])
    expect(groups.map((g) => g.key)).toEqual(["2026-10", "2025-10"])
  })
})
