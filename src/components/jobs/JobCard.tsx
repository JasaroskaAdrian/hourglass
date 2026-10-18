import { CarIcon, ClockIcon, UserIcon } from "@phosphor-icons/react"
import { format, parseISO } from "date-fns"
import { Card, CardContent } from "@/components/ui/card"
import { calculateJobTotal } from "@/lib/calc"
import { formatCHF, formatMinutes } from "@/lib/format"
import type { Job } from "@/types/job"
import { StatusBadge } from "./StatusBadge"

export function JobCard({ job }: { job: Job }) {
  const { workedMinutes, total } = calculateJobTotal(job)

  return (
    <Card>
      <CardContent className="flex flex-col gap-3 text-sm">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="truncate text-base font-bold">{job.name}</h3>
            <p className="text-muted-foreground">
              {format(parseISO(job.date), "EEE d MMM yyyy")} · {job.start}–{job.end}
            </p>
          </div>
          <StatusBadge status={job.status} />
        </div>

        <ul className="flex flex-col gap-1 text-muted-foreground">
          <li className="flex items-center gap-2">
            <UserIcon className="size-4" /> {job.client}
          </li>
          <li className="flex items-center gap-2">
            <ClockIcon className="size-4" /> {formatMinutes(workedMinutes)} worked
          </li>
          <li className="flex items-center gap-2">
            <CarIcon className="size-4" /> {formatMinutes(job.driveMinutes)} drive
          </li>
        </ul>

        <p className="text-right text-lg font-bold">{formatCHF(total)}</p>
      </CardContent>
    </Card>
  )
}
