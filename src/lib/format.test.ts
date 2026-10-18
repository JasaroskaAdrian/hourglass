import { describe, expect, it } from "vitest"
import { formatCHF, formatMinutes } from "./format"

describe("formatMinutes", () => {
  it("formats hours and minutes", () => {
    expect(formatMinutes(0)).toBe("0 min")
    expect(formatMinutes(45)).toBe("45 min")
    expect(formatMinutes(120)).toBe("2 h")
    expect(formatMinutes(150)).toBe("2 h 30 min")
  })
})

describe("formatCHF", () => {
  it("uses Swiss currency formatting", () => {
    // Intl puts a non-breaking space after "CHF", and the thousands
    // separator is ' or ’ depending on the JS engine's ICU data
    expect(formatCHF(1234.5)).toMatch(/^CHF\s1['’]234\.50$/)
  })
})
