import { CalendarBlankIcon, SquaresFourIcon } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"

export type JobsView = "cards" | "calendar"

type Props = {
  value: JobsView
  onChange: (view: JobsView) => void
}

export function ViewSwitch({ value, onChange }: Props) {
  return (
    <div className="flex" role="group" aria-label="View">
      <Button
        variant={value === "cards" ? "secondary" : "outline"}
        aria-pressed={value === "cards"}
        onClick={() => onChange("cards")}
      >
        <SquaresFourIcon /> Cards
      </Button>
      <Button
        variant={value === "calendar" ? "secondary" : "outline"}
        aria-pressed={value === "calendar"}
        onClick={() => onChange("calendar")}
      >
        <CalendarBlankIcon /> Calendar
      </Button>
    </div>
  )
}
