import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { JobStatus } from "@/types/job"

const styles: Record<JobStatus, { label: string; className: string }> = {
  open: { label: "Open", className: "bg-status-open/15 text-status-open" },
  invoiced: { label: "Invoiced", className: "bg-status-invoiced/15 text-status-invoiced" },
  paid: { label: "Paid", className: "bg-status-paid/15 text-status-paid" },
}

export function StatusBadge({ status }: { status: JobStatus }) {
  const { label, className } = styles[status]
  return <Badge className={cn("font-semibold", className)}>{label}</Badge>
}
