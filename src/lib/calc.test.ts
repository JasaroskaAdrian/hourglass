import { describe, expect, it } from "vitest"
import { calculateJobTotal, durationMinutes, parseTime, roundUpMinutes } from "./calc"

const base = { driveMinutes: 0, hourlyRate: 120, driveRate: 120 }

describe("parseTime", () => {
  it("parses HH:mm", () => {
    expect(parseTime("00:00")).toBe(0)
    expect(parseTime("8:30")).toBe(510)
    expect(parseTime("23:59")).toBe(1439)
  })

  it("rejects invalid times", () => {
    expect(() => parseTime("24:00")).toThrow()
    expect(() => parseTime("12:60")).toThrow()
    expect(() => parseTime("noon")).toThrow()
    expect(() => parseTime("")).toThrow()
  })
})

describe("durationMinutes", () => {
  it("handles a normal day", () => {
    expect(durationMinutes("09:00", "11:30")).toBe(150)
  })

  it("wraps over midnight", () => {
    expect(durationMinutes("22:00", "01:30")).toBe(210)
  })

  it("is zero when start equals end", () => {
    expect(durationMinutes("10:00", "10:00")).toBe(0)
  })
})

describe("roundUpMinutes", () => {
  it("leaves minutes unchanged with 'none'", () => {
    expect(roundUpMinutes(61, "none")).toBe(61)
  })

  it("rounds up to the next quarter hour", () => {
    expect(roundUpMinutes(61, "15")).toBe(75)
    expect(roundUpMinutes(75, "15")).toBe(75)
  })

  it("rounds up to the next half hour", () => {
    expect(roundUpMinutes(61, "30")).toBe(90)
    expect(roundUpMinutes(90, "30")).toBe(90)
  })

  it("keeps zero at zero", () => {
    expect(roundUpMinutes(0, "30")).toBe(0)
  })
})

describe("calculateJobTotal", () => {
  it("bills work and drive time", () => {
    const result = calculateJobTotal({
      start: "09:00",
      end: "11:00",
      driveMinutes: 30,
      hourlyRate: 120,
      driveRate: 60,
    })
    expect(result).toEqual({
      workedMinutes: 120,
      billedMinutes: 120,
      driveMinutes: 30,
      workAmount: 240,
      driveAmount: 30,
      total: 270,
    })
  })

  it("works with zero drive time", () => {
    const result = calculateJobTotal({ ...base, start: "14:00", end: "15:30" })
    expect(result.driveAmount).toBe(0)
    expect(result.total).toBe(180)
  })

  it("handles a job over midnight", () => {
    const result = calculateJobTotal({ ...base, start: "23:00", end: "01:00" })
    expect(result.workedMinutes).toBe(120)
    expect(result.total).toBe(240)
  })

  it("applies 15-minute rounding to work time only", () => {
    const result = calculateJobTotal({
      ...base,
      start: "09:00",
      end: "10:05",
      driveMinutes: 7,
      rounding: "15",
    })
    expect(result.workedMinutes).toBe(65)
    expect(result.billedMinutes).toBe(75)
    expect(result.workAmount).toBe(150)
    expect(result.driveAmount).toBe(14)
  })

  it("applies 30-minute rounding", () => {
    const result = calculateJobTotal({ ...base, start: "09:00", end: "10:05", rounding: "30" })
    expect(result.billedMinutes).toBe(90)
    expect(result.total).toBe(180)
  })

  it("applies the minimum duration", () => {
    const result = calculateJobTotal({ ...base, start: "09:00", end: "09:20", minimumMinutes: 60 })
    expect(result.workedMinutes).toBe(20)
    expect(result.billedMinutes).toBe(60)
    expect(result.total).toBe(120)
  })

  it("does not apply the minimum when work is longer", () => {
    const result = calculateJobTotal({ ...base, start: "09:00", end: "11:00", minimumMinutes: 60 })
    expect(result.billedMinutes).toBe(120)
  })

  it("applies the minimum after rounding", () => {
    const result = calculateJobTotal({
      ...base,
      start: "09:00",
      end: "09:50",
      minimumMinutes: 90,
      rounding: "15",
    })
    expect(result.billedMinutes).toBe(90)
  })

  it("rounds amounts to the cent without floating-point errors", () => {
    // 10 min at 95.50/h = 15.9166… -> 15.92
    const result = calculateJobTotal({
      start: "09:00",
      end: "09:10",
      driveMinutes: 10,
      hourlyRate: 95.5,
      driveRate: 95.5,
    })
    expect(result.workAmount).toBe(15.92)
    expect(result.total).toBe(31.84)
  })

  it("rejects negative values", () => {
    expect(() => calculateJobTotal({ ...base, start: "09:00", end: "10:00", driveMinutes: -5 })).toThrow()
    expect(() => calculateJobTotal({ ...base, start: "09:00", end: "10:00", hourlyRate: -1 })).toThrow()
  })
})
