import type { ReactNode } from "react"

type Props = {
  title: string
  /** Optional controls shown on the right (buttons, switches). */
  actions?: ReactNode
}

export function PageHeader({ title, actions }: Props) {
  return (
    <header className="mb-6 flex flex-wrap items-center justify-between gap-3">
      <h1 className="text-2xl font-semibold">{title}</h1>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </header>
  )
}
