import { NavLink } from "react-router-dom"
import { cn } from "@/lib/utils"
import type { NavItem } from "./nav-items"

type Props = {
  item: NavItem
  variant: "sidebar" | "bottom"
}

export function NavLinkItem({ item, variant }: Props) {
  const Icon = item.icon
  return (
    <NavLink
      to={item.to}
      className={({ isActive }) =>
        cn(
          "flex items-center text-sidebar-foreground/75 transition-colors hover:text-sidebar-foreground",
          variant === "sidebar"
            ? "gap-3 px-3 py-2 text-sm hover:bg-sidebar-accent"
            : "flex-1 flex-col gap-0.5 py-2 text-[11px]",
          isActive && "text-sidebar-foreground",
          isActive && variant === "sidebar" && "bg-sidebar-accent",
        )
      }
    >
      {({ isActive }) => (
        <>
          <Icon className="size-6" weight={isActive ? "fill" : "regular"} />
          <span>{item.label}</span>
        </>
      )}
    </NavLink>
  )
}
